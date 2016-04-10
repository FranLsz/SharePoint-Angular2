import {Empleado} from '../models/empleado'
import {DatosEvento} from '../models/datos-evento'
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit, EventEmitter} from 'angular2/core'

@Component({
    selector: 'form-empleado',
    templateUrl: BASE_URL + '/templates/form-empleado.template.html',
    inputs: ['empleado'],
    outputs: ['formEmpleadoEvt']
})

export class FormEmpleadoComponent {
    public accion: string;
    public btnAccion: string;
    public empleado: Empleado;
    public formEmpleadoEvt: EventEmitter;

    constructor(private _empleadoService: EmpleadoService) {
        this.formEmpleadoEvt = new EventEmitter();
        this.accion = "Nuevo empleado";
        this.btnAccion = "Dar de alta";
    };

    addEmpleado() {
        this._empleadoService.addEmpleado(this.empleado).subscribe(
            data => {
                this.lanzarEvento("AGREGAR_A_LISTA", Empleado.fromJson(data.d));
            },
            err => { console.log("POST Empleados Error: " + err._body); }
        );
    }

    lanzarEvento(orden: string, datos: any) {
        this.formEmpleadoEvt.next(new DatosEvento(orden, datos));
    }
}