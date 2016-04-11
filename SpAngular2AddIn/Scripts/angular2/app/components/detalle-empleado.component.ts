import {Empleado}                       from '../models/empleado'
import {DatosEvento}                    from '../models/datos-evento'
import {EmpleadoService}                from '../services/empleado.service'
import {Component, EventEmitter}        from 'angular2/core'

@Component({
    selector: 'detalle-empleado',
    templateUrl: BASE_URL + '/templates/detalle-empleado.template.html',
    inputs: ['empleado'],
    outputs: ['detalleEmpleadoEvt']
})

export class DetalleEmpleadoComponent {

    public empleado: Empleado;
    public detalleEmpleadoEvt: EventEmitter;

    constructor(private _empleadoService: EmpleadoService) {
        this.detalleEmpleadoEvt = new EventEmitter();
    }

    editEmpleado() {
        this.lanzarEvento("EDITAR", this.empleado);
        setTimeout(() => this.empleado = null, 0);
    }

    deleteEmpleado() {
        this._empleadoService.deleteEmpleado(this.empleado).subscribe(
            data => {
                this.lanzarEvento("DELETE", this.empleado);
                this.empleado = null;
            },
            err => {
                console.log("DELETE Empleado Error: " + err._body);
            }
        );
    }

    lanzarEvento(orden: string, datos: any) {
        this.detalleEmpleadoEvt.next(new DatosEvento(orden, datos));
    }
}