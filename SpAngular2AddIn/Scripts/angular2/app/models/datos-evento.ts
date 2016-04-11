export class DatosEvento {

    orden: string;
    datos: any;

    constructor(orden: string, datos: any) {
        this.orden = orden;
        this.datos = datos;
    }
}