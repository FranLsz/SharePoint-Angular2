import {Empleado}                                                       from '../models/empleado'
import {DatosEvento}                                                    from '../models/datos-evento'
import {EmpleadoService}                                                from '../services/empleado.service'
import {NgForm, Control, Validators, FormBuilder, ControlGroup}         from 'angular2/common'
import {Component, OnInit, OnChanges, EventEmitter}                     from 'angular2/core'

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
    public activo: boolean = true;

    constructor(private _empleadoService: EmpleadoService, private builder: FormBuilder) {
        this.formEmpleadoEvt = new EventEmitter();


    };
    ngOnInit() {
        this.accion = "Nuevo empleado";
        this.btnAccion = "Dar de alta";
    }

    ngOnChanges(registro) {
        if (registro.empleado != null) {
            if (registro.empleado.currentValue.id > 0) {
                this.accion = "Modificar empleado";
                this.btnAccion = "Guardar cambios";
            } else {
                this.accion = "Nuevo empleado"
                this.btnAccion = "Dar de alta";
            }
        }
    }

    onSubmit() {
        if (this.accion == "Nuevo empleado") {
            this._empleadoService.addEmpleado(this.empleado).subscribe(
                data => {
                    this.lanzarEvento("AGREGAR_A_LISTA", Empleado.fromJson(data.d));

                    // Reset de los campos
                    this.empleado = new Empleado();
                    this.activo = false;
                    setTimeout(() => this.activo = true, 0);
                },
                err => { console.log("POST Empleados Error: " + err._body); }
            );
        } else {
            this._empleadoService.putEmpleado(this.empleado).subscribe(
                data => {
                    this.lanzarEvento("ACTUALIZAR_DE_LA_LISTA", this.empleado);

                    this.accion = "Nuevo empleado"
                    this.btnAccion = "Dar de alta";

                    // Reset de los campos
                    this.empleado = new Empleado();
                    this.activo = false;
                    setTimeout(() => this.activo = true, 0);
                },
                err => {
                    console.log("PUT Empleado Error: " + err._body);
                }
            );
        }
    }

    get diagnostico() {
        return "de lujo: " + JSON.stringify(this.empleado);
    }

    lanzarEvento(orden: string, datos: any) {
        this.formEmpleadoEvt.next(new DatosEvento(orden, datos));
    }
}