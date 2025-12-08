import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { MesaCardComponent } from './components/mesa-card/mesa-card.component';
import { Mesa } from '../../core/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, MesaCardComponent, MatSnackBarModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit, OnDestroy {
  mesas: Mesa[] = [];
  gridCols: number = 4;
  loadingMesaId = signal<number | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private mesaService: MesaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMesas();
    this.setupGrid();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMesas(): void {
    this.mesaService.getMesas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (mesas) => {
          this.mesas = this.sortMesas(mesas);
        },
        error: (err) => {
          this.snackBar.open('Error al cargar las mesas', 'Cerrar', { duration: 3000 });
          console.error('Error loading mesas:', err);
        }
      });
  }

  private sortMesas(mesas: Mesa[]): Mesa[] {
    const priority = {
      'esperando_cuenta': 1,
      'ocupada': 2,
      'libre': 3
    };

    return mesas.sort((a, b) => priority[a.estado] - priority[b.estado]);
  }

  private setupGrid(): void {
    this.breakpointObserver.observe([
      '(max-width: 599px)',
      '(min-width: 600px) and (max-width: 900px)',
      '(min-width: 901px)'
    ]).pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result.breakpoints['(max-width: 599px)']) {
        this.gridCols = 2;
      } else if (result.breakpoints['(min-width: 600px) and (max-width: 900px)']) {
        this.gridCols = 3;
      } else {
        this.gridCols = 4;
      }
    });
  }

  /**
   * CRITICAL: Handle table selection with state transition logic
   * Case A: Free table -> Call ocuparMesa -> Navigate on success
   * Case B: Occupied/Cuenta table -> Navigate immediately
   */
  onMesaClick(mesa: Mesa): void {
    // Prevent double-click if already loading
    if (this.loadingMesaId() === mesa.id) {
      return;
    }

    if (mesa.estado === 'libre') {
      // Case A: Free table - must occupy before navigating
      // 1. Visual feedback
      this.loadingMesaId.set(mesa.id);

      // 2. State transaction
      this.mesaService.ocuparMesa(mesa.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (mesaActualizada) => {
            // 3. Navigate on success
            this.router.navigate(['/pedidos/mesa', mesa.id]);
          },
          error: (err) => {
            // 4. Rollback and alert
            this.loadingMesaId.set(null);
            this.snackBar.open(
              err.message || 'Error: La mesa no pudo ser asignada',
              'Cerrar',
              { duration: 4000 }
            );
            // Refresh to get real state
            this.loadMesas();
          }
        });
    } else {
      // Case B: Already occupied or waiting for bill - navigate immediately
      this.router.navigate(['/pedidos/mesa', mesa.id]);
    }
  }
}

