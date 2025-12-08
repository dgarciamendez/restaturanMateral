import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pedido, Comensal, PedidoItem } from '../models/pedido.model';
import { Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private activePedidos: Map<number, Pedido> = new Map(); // mesaId -> Pedido

    constructor() { }

    getPedidoByMesa(mesaId: number): Observable<Pedido> {
        if (!this.activePedidos.has(mesaId)) {
            this.createPedido(mesaId);
        }
        return of(this.activePedidos.get(mesaId)!);
    }

    private createPedido(mesaId: number): void {
        const newPedido: Pedido = {
            id: Math.floor(Math.random() * 10000),
            mesaId: mesaId,
            comensales: [
                { id: '1', nombre: 'Comensal 1', items: [] }
            ],
            estado: 'en_proceso',
            total: 0,
            fechaInicio: new Date()
        };
        this.activePedidos.set(mesaId, newPedido);
    }

    updatePedido(pedido: Pedido): Observable<Pedido> {
        this.calculateTotal(pedido);
        this.activePedidos.set(pedido.mesaId, pedido);
        return of(pedido);
    }

    private calculateTotal(pedido: Pedido): void {
        let total = 0;
        pedido.comensales.forEach(c => {
            c.items.forEach(i => {
                total += i.producto.precio * i.cantidad;
            });
        });
        pedido.total = total;
    }
}
