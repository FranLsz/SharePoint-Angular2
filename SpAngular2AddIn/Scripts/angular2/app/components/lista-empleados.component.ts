import {Empleado}                           from '../models/empleado'
import {DatosEvento}                        from '../models/datos-evento'
import {EmpleadoService}                    from '../services/empleado.service'
import {Component, OnInit, EventEmitter}    from 'angular2/core'

@Component({
    selector: 'lista-empleados',
    templateUrl: BASE_URL + '/templates/lista-empleados.template.html',
    inputs: ['listaEmpleados'],
    outputs: ['listaEmpleadosEvt']
})

export class ListaEmpleadosComponent {
    public listaEmpleados: Empleado[];
    public empleado: Empleado;
    public listaEmpleadosEvt: EventEmitter;

    constructor(private _empleadoService: EmpleadoService) {
        this.listaEmpleadosEvt = new EventEmitter();
    };

    onSelect(empleado: Empleado) {
        this.lanzarEvento("DETALLE", empleado);
    }

    lanzarEvento(orden: string, datos: any) {
        this.listaEmpleadosEvt.next(new DatosEvento(orden, datos));
    }
}