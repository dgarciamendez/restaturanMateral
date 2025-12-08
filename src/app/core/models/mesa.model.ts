export interface Mesa {
    id: number;
    numero: number;
    estado: 'libre' | 'ocupada' | 'esperando_cuenta';
    tiempoInicio?: Date; // Optional, only for occupied tables
    pedidoId?: number;   // Optional, link to the active order
}
