import { Marca } from './Marca.model';

export class Producto{
    id: number;
    nombre: string;
    costo: number;
    precio: number;
    marcaID: number;
    marca?: Marca;
}