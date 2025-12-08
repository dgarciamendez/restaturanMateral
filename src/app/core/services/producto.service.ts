import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria, Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private categorias: Categoria[] = [
        { id: 1, nombre: 'Barra Caliente' },
        { id: 2, nombre: 'Barra Fria' }
    ];

    private productos: Producto[] = [
        // Barra Caliente
        { id: 1, nombre: 'TACO DE CAMARON', precio: 45, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 2, nombre: 'TACO DE PESCADO', precio: 40, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 3, nombre: 'TACO MIXTO', precio: 50, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 4, nombre: 'QUESADILLA DE PESCADO', precio: 55, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 5, nombre: 'QUESADILLA DE CAMARON', precio: 60, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 6, nombre: 'QUESADILLA MIXTA', precio: 65, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 7, nombre: 'CHAROLA CAPEADA', precio: 250, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 8, nombre: 'TARRO MICHELADO', precio: 80, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },
        { id: 9, nombre: 'TARRO CHELADO', precio: 75, categoriaId: 1, imagen: 'assets/img/placeholder.jpg' },

        // Barra Fria
        { id: 10, nombre: 'TOSTADA DE AGUACHILE', precio: 90, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 11, nombre: 'TOSTADA DE CEVICHE', precio: 85, categoriaId: 2, imagen: 'assets/img/placeholder.jpg', descripcion: 'Pescado o Camarón' },
        { id: 12, nombre: 'TOSTADA DEL DANY', precio: 95, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 13, nombre: 'TOSTADA CREMOSA', precio: 90, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 14, nombre: 'TOSTADA MAZATLECA', precio: 100, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 15, nombre: 'TACO DE CAMARÓN O PESCADO', precio: 45, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 16, nombre: 'CEVICHE DE CAMARON', precio: 180, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 17, nombre: 'CEVICHE DE CAMARON MIXTO', precio: 190, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 18, nombre: 'CEVICHE DE PESCADO', precio: 160, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 19, nombre: 'AGUACHILE', precio: 180, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 20, nombre: 'AGUACHILE MIXTO', precio: 190, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 21, nombre: 'AGUACHILE 3 RIOS', precio: 200, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 22, nombre: 'EL CREMOSO', precio: 170, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 23, nombre: 'COCTEL DE CAMARON CON PULPO', precio: 160, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 24, nombre: 'TOSTADA CULICHI', precio: 95, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 25, nombre: 'CEVICHE MITOTERO', precio: 185, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 26, nombre: 'MARISCADA DEL TORO', precio: 450, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 27, nombre: 'CHAROLA C-VICHITO CHICA', precio: 300, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 28, nombre: 'CHAROLA C-VICHITO GRANDE', precio: 500, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 29, nombre: 'TOSTADONA', precio: 120, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 30, nombre: 'LA PIRATONA', precio: 130, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' },
        { id: 31, nombre: 'COPA AGASAJO', precio: 150, categoriaId: 2, imagen: 'assets/img/placeholder.jpg' }
    ];

    constructor() { }

    getCategorias(): Observable<Categoria[]> {
        return of([...this.categorias]);
    }

    getProductos(): Observable<Producto[]> {
        return of([...this.productos]);
    }

    getProductosByCategoria(categoriaId: number): Observable<Producto[]> {
        return of(this.productos.filter(p => p.categoriaId === categoriaId));
    }
}
