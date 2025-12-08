import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Mesa } from '../models/mesa.model';

@Injectable({
    providedIn: 'root'
})
export class MesaService {
    private mesas: Mesa[] = [
        { id: 1, numero: 1, estado: 'libre' },
        { id: 2, numero: 2, estado: 'ocupada', tiempoInicio: new Date(Date.now() - 45 * 60000), pedidoId: 101 },
        { id: 3, numero: 3, estado: 'esperando_cuenta', pedidoId: 102 },
        { id: 4, numero: 4, estado: 'libre' },
        { id: 5, numero: 5, estado: 'ocupada', tiempoInicio: new Date(Date.now() - 15 * 60000), pedidoId: 103 },
        { id: 6, numero: 6, estado: 'libre' },
        { id: 7, numero: 7, estado: 'libre' },
        { id: 8, numero: 8, estado: 'esperando_cuenta', pedidoId: 104 },
        { id: 9, numero: 9, estado: 'libre' },
        { id: 10, numero: 10, estado: 'ocupada', tiempoInicio: new Date(Date.now() - 30 * 60000), pedidoId: 105 },
        { id: 11, numero: 11, estado: 'libre' },
        { id: 12, numero: 12, estado: 'libre' },
    ];

    constructor() { }

    /**
     * Get all tables with their current states
     * Simulates GET /api/mesas
     */
    getMesas(): Observable<Mesa[]> {
        return of([...this.mesas]).pipe(delay(300));
    }

    /**
     * Occupy a table (change state from 'libre' to 'ocupada')
     * Simulates POST /api/mesas/{id}/ocupar
     */
    ocuparMesa(mesaId: number): Observable<Mesa> {
        const mesa = this.mesas.find(m => m.id === mesaId);

        if (!mesa) {
            return throwError(() => new Error('Mesa no encontrada'));
        }

        if (mesa.estado !== 'libre') {
            return throwError(() => new Error('Mesa ya ocupada por otro mesero'));
        }

        // Simulate successful occupation
        mesa.estado = 'ocupada';
        mesa.tiempoInicio = new Date();
        mesa.pedidoId = Math.floor(Math.random() * 10000) + 1000; // Generate random order ID

        return of({ ...mesa }).pipe(delay(500));
    }
}
