import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../../../core/services/producto.service';
import { PedidoService } from '../../../../core/services/pedido.service';
import { Producto, Categoria } from '../../../../core/models/producto.model';
import { Pedido, Comensal, PedidoItem } from '../../../../core/models/pedido.model';

@Component({
    selector: 'app-mesa-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
        MatChipsModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule
    ],
    templateUrl: './mesa-detail.component.html',
    styleUrl: './mesa-detail.component.scss'
})
export class MesaDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productoService = inject(ProductoService);
    private pedidoService = inject(PedidoService);
    private snackBar = inject(MatSnackBar);

    mesaId: number | null = null;

    // State
    categorias = signal<Categoria[]>([]);
    productos = signal<Producto[]>([]);
    filteredProductos = signal<Producto[]>([]);
    selectedCategoriaId = signal<number | null>(null);

    currentPedido = signal<Pedido | null>(null);
    selectedComensalId = signal<string | null>(null);

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.mesaId = +id;
                this.loadData();
            }
        });
    }

    private loadData() {
        // Load Categories and Products
        this.productoService.getCategorias().subscribe(cats => {
            this.categorias.set(cats);
            if (cats.length > 0) {
                this.selectCategoria(cats[0].id);
            }
        });

        this.productoService.getProductos().subscribe(prods => {
            this.productos.set(prods);
            this.filterProductos();
        });

        // Load Order
        if (this.mesaId) {
            this.pedidoService.getPedidoByMesa(this.mesaId).subscribe(pedido => {
                this.currentPedido.set(pedido);
                if (pedido.comensales.length > 0) {
                    this.selectedComensalId.set(pedido.comensales[0].id);
                }
            });
        }
    }

    selectCategoria(catId: number) {
        this.selectedCategoriaId.set(catId);
        this.filterProductos();
    }

    private filterProductos() {
        const catId = this.selectedCategoriaId();
        if (catId) {
            this.filteredProductos.set(this.productos().filter(p => p.categoriaId === catId));
        } else {
            this.filteredProductos.set(this.productos());
        }
    }

    // --- Order Management ---

    addComensal() {
        const pedido = this.currentPedido();
        if (!pedido) return;

        const newId = (pedido.comensales.length + 1).toString();
        const newComensal: Comensal = {
            id: newId,
            nombre: `Comensal ${newId} `,
            items: []
        };

        pedido.comensales.push(newComensal);
        this.updatePedido(pedido);
        this.selectedComensalId.set(newId);
    }

    selectComensal(comensalId: string) {
        this.selectedComensalId.set(comensalId);
    }

    addProductToComensal(producto: Producto) {
        const pedido = this.currentPedido();
        const comensalId = this.selectedComensalId();

        if (!pedido || !comensalId) {
            this.snackBar.open('Selecciona un comensal primero', 'Cerrar', { duration: 2000 });
            return;
        }

        const comensal = pedido.comensales.find(c => c.id === comensalId);
        if (comensal) {
            const existingItem = comensal.items.find(i => i.producto.id === producto.id);
            if (existingItem) {
                existingItem.cantidad++;
            } else {
                comensal.items.push({
                    id: crypto.randomUUID(),
                    producto: producto,
                    cantidad: 1
                });
            }
            this.updatePedido(pedido);
        }
    }

    incrementItem(comensalId: string, itemId: string) {
        const pedido = this.currentPedido();
        if (!pedido) return;

        const comensal = pedido.comensales.find(c => c.id === comensalId);
        if (comensal) {
            const item = comensal.items.find(i => i.id === itemId);
            if (item) {
                item.cantidad++;
                this.updatePedido(pedido);
            }
        }
    }

    decrementItem(comensalId: string, itemId: string) {
        const pedido = this.currentPedido();
        if (!pedido) return;

        const comensal = pedido.comensales.find(c => c.id === comensalId);
        if (comensal) {
            const item = comensal.items.find(i => i.id === itemId);
            if (item) {
                if (item.cantidad > 1) {
                    item.cantidad--;
                } else {
                    // Remove item if quantity becomes 0? Or ask confirmation? 
                    // For now, just remove if 1 -> 0
                    comensal.items = comensal.items.filter(i => i.id !== itemId);
                }
                this.updatePedido(pedido);
            }
        }
    }

    removeItem(comensalId: string, itemId: string) {
        const pedido = this.currentPedido();
        if (!pedido) return;

        const comensal = pedido.comensales.find(c => c.id === comensalId);
        if (comensal) {
            comensal.items = comensal.items.filter(i => i.id !== itemId);
            this.updatePedido(pedido);
        }
    }

    updatePedido(pedido: Pedido) {
        this.pedidoService.updatePedido(pedido).subscribe(updated => {
            this.currentPedido.set(updated);
        });
    }

    goBack() {
        this.router.navigate(['/pedidos']);
    }
}
