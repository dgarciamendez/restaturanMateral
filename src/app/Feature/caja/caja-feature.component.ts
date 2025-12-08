import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CajaService, Caja, MovimientoCaja } from '../../core/services/caja.service';

@Component({
  selector: 'app-caja-feature',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './caja-feature.component.html',
  styleUrl: './caja-feature.component.scss'
})
export class CajaFeatureComponent implements OnInit {
  private cajaService = inject(CajaService);
  private fb = inject(FormBuilder);

  cajaActual: Caja | null = null;
  movimientos: MovimientoCaja[] = [];

  // Forms
  aperturaForm: FormGroup;
  movimientoForm: FormGroup;
  cierreForm: FormGroup;

  // UI State
  activeTabIndex = 0;
  cierreFase: 'CONTEO' | 'REPORTE' = 'CONTEO';
  reporteCierre: any = null;

  displayedColumns: string[] = ['fecha', 'tipo', 'motivo', 'monto'];

  constructor() {
    this.aperturaForm = this.fb.group({
      montoInicial: [0, [Validators.required, Validators.min(0)]]
    });

    this.movimientoForm = this.fb.group({
      tipo: ['SALIDA', Validators.required],
      monto: [0, [Validators.required, Validators.min(0.01)]],
      motivo: ['', Validators.required]
    });

    this.cierreForm = this.fb.group({
      montoContado: [0, [Validators.required, Validators.min(0)]],
      fondoProximo: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cajaService.cajaActual$.subscribe(caja => {
      this.cajaActual = caja;
      if (caja) {
        this.loadMovimientos();
        this.activeTabIndex = 1; // Go to movements if open
      } else {
        this.activeTabIndex = 0; // Go to opening if closed
      }
    });
  }

  loadMovimientos() {
    this.cajaService.getMovimientos().subscribe(movs => {
      this.movimientos = movs;
    });
  }

  abrirCaja() {
    if (this.aperturaForm.valid) {
      const monto = this.aperturaForm.get('montoInicial')?.value;
      this.cajaService.abrirCaja(monto).subscribe(() => {
        this.aperturaForm.reset({ montoInicial: 0 });
      });
    }
  }

  registrarMovimiento() {
    if (this.movimientoForm.valid) {
      const { tipo, monto, motivo } = this.movimientoForm.value;
      this.cajaService.registrarMovimiento(tipo, monto, motivo).subscribe(() => {
        this.movimientoForm.reset({ tipo: 'SALIDA', monto: 0, motivo: '' });
        this.loadMovimientos();
      });
    }
  }

  iniciarCierre() {
    if (this.cierreForm.valid) {
      const { montoContado, fondoProximo } = this.cierreForm.value;
      this.cajaService.cerrarCaja(montoContado, fondoProximo).subscribe((cajaCerrada) => {
        this.cierreFase = 'REPORTE';

        const esperado = cajaCerrada.montoFinalEsperado || 0;
        const contado = cajaCerrada.montoFinalContado || 0;
        const descuadre = contado - esperado;

        this.reporteCierre = {
          esperado,
          contado,
          descuadre,
          estadoDescuadre: descuadre === 0 ? 'OK' : (descuadre > 0 ? 'SOBRANTE' : 'FALTANTE'),
          fondoProximo
        };
      });
    }
  }

  nuevoTurno() {
    this.cierreFase = 'CONTEO';
    this.reporteCierre = null;
    this.cierreForm.reset({ montoContado: 0, fondoProximo: 0 });
    this.activeTabIndex = 0;
  }
}
