import {Empleado} from '../models/empleado'
import {DatosEvento} from '../models/datos-evento'
import {FormEmpleadoComponent} from './form-empleado.component'
import {ListaEmpleadosComponent} from './lista-empleados.component'
import {DetalleEmpleadoComponent} from './detalle-empleado.component'
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'home',
    templateUrl: BASE_URL + '/templates/home.template.html',
    providers: [EmpleadoService],
    directives: [FormEmpleadoComponent, ListaEmpleadosComponent, DetalleEmpleadoComponent]
})

export class HomeComponent {
    public empleadoForm: Empleado;
    public accionForm: string;
    public empleadoDetalle: Empleado;
    public listaEmpleados: Empleado[];

    constructor(private _empleadoService: EmpleadoService) {
        this.empleadoForm = new Empleado();
        this.listaEmpleados = [];
    };

    ngOnInit() {
        this.accionForm = "Nuevo empleado";
        this.getEmpleados();
    }

    getEmpleados() {
        this._empleadoService.getEmpleados().subscribe(
            data => {
                this.listaEmpleados = Empleado.fromJsonList(data.d.results);
            },
            err => { console.log("GET Empleados Error: " + err._body); }
        );
    }

    manejarEventos(arg: DatosEvento) {
        switch (arg.orden) {
            case "AGREGAR_A_LISTA":
                this.listaEmpleados.push(arg.datos);
                break;
            case "ACTUALIZAR_DE_LA_LISTA":
                for (var i = 0; i < this.listaEmpleados.length; i++) {
                    if (this.listaEmpleados[i].id == arg.datos.id) 
                        this.listaEmpleados[i] = arg.datos;
                }
                break;
            case "DETALLE":
                this.empleadoDetalle = new Empleado(arg.datos.nombre, arg.datos.apellidos, arg.datos.puesto, arg.datos.salario, arg.datos.id);
                break;
            case "DELETE":
                var i = this.listaEmpleados.map(function (e) { return e.id; }).indexOf(arg.datos.id);
                this.listaEmpleados.splice(i, 1);
                break;
            case "EDITAR":
                this.empleadoForm = new Empleado(arg.datos.nombre, arg.datos.apellidos, arg.datos.puesto, arg.datos.salario, arg.datos.id);
                //this.accionForm = "Modificar empleado";
                break;
        }
    }
}