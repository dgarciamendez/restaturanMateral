import { Producto } from './producto.model';

export interface PedidoItem {
    id: string; // UUID for uniqueness in list
    producto: Producto;
    cantidad: number;
    notas?: string;
}

export interface Comensal {
    id: string; // UUID or simple counter string '1', '2'
    nombre: string;
    items: PedidoItem[];
}

export interface Pedido {
    id: number;
    mesaId: number;
    comensales: Comensal[];
    estado: 'en_proceso' | 'enviado' | 'pagado';
    total: number;
    fechaInicio: Date;
}
