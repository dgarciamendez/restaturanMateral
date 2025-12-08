import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface MovimientoCaja {
    id: string;
    cajaId: string;
    tipo: 'ENTRADA' | 'SALIDA';
    monto: number;
    motivo: string;
    fecha: Date;
}

export interface Caja {
    id: string;
    usuarioId: string;
    fechaApertura: Date;
    fechaCierre?: Date;
    montoInicial: number;
    montoFinalEsperado?: number;
    montoFinalContado?: number;
    estado: 'ABIERTA' | 'CERRADA';
    movimientos: MovimientoCaja[];
}

@Injectable({
    providedIn: 'root'
})
export class CajaService {
    private cajaActualSubject = new BehaviorSubject<Caja | null>(null);
    cajaActual$ = this.cajaActualSubject.asObservable();

    // Mock database
    private cajas: Caja[] = [];

    constructor() {
        // Check if there is an open session in local storage or mock db
        const storedCaja = localStorage.getItem('cajaActual');
        if (storedCaja) {
            this.cajaActualSubject.next(JSON.parse(storedCaja));
        }
    }

    getEstadoCaja(): 'ABIERTA' | 'CERRADA' {
        return this.cajaActualSubject.value?.estado || 'CERRADA';
    }

    abrirCaja(montoInicial: number): Observable<Caja> {
        const nuevaCaja: Caja = {
            id: this.generateId(),
            usuarioId: 'user-1', // Mock user
            fechaApertura: new Date(),
            montoInicial: montoInicial,
            estado: 'ABIERTA',
            movimientos: []
        };

        this.cajas.push(nuevaCaja);
        this.updateCajaActual(nuevaCaja);
        return of(nuevaCaja);
    }

    registrarMovimiento(tipo: 'ENTRADA' | 'SALIDA', monto: number, motivo: string): Observable<MovimientoCaja> {
        const caja = this.cajaActualSubject.value;
        if (!caja || caja.estado !== 'ABIERTA') {
            throw new Error('No hay una caja abierta');
        }

        const movimiento: MovimientoCaja = {
            id: this.generateId(),
            cajaId: caja.id,
            tipo,
            monto,
            motivo,
            fecha: new Date()
        };

        caja.movimientos.push(movimiento);
        this.updateCajaActual(caja);
        return of(movimiento);
    }

    cerrarCaja(montoContado: number, fondoProximo: number): Observable<Caja> {
        const caja = this.cajaActualSubject.value;
        if (!caja || caja.estado !== 'ABIERTA') {
            throw new Error('No hay una caja abierta');
        }

        // Calculate expected amount
        // Expected = Initial + Sales (Mocked as 0 for now or we could inject PedidoService) + Movements
        // For this task, we focus on movements. 
        // NOTE: In a real app, we would sum up sales here.
        const totalMovimientos = caja.movimientos.reduce((acc, mov) => {
            return mov.tipo === 'ENTRADA' ? acc + mov.monto : acc - mov.monto;
        }, 0);

        // Mock sales for demonstration if needed, or keep 0.
        const ventas = 0;

        caja.montoFinalEsperado = caja.montoInicial + ventas + totalMovimientos;
        caja.montoFinalContado = montoContado;
        caja.fechaCierre = new Date();
        caja.estado = 'CERRADA';

        this.updateCajaActual(null); // Clear active session
        // In a real app, we might want to return the closed caja details for the report
        return of(caja);
    }

    getMovimientos(): Observable<MovimientoCaja[]> {
        const caja = this.cajaActualSubject.value;
        return of(caja ? caja.movimientos : []);
    }

    private updateCajaActual(caja: Caja | null) {
        this.cajaActualSubject.next(caja);
        if (caja) {
            localStorage.setItem('cajaActual', JSON.stringify(caja));
        } else {
            localStorage.removeItem('cajaActual');
        }
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
