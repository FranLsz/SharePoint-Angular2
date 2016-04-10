import {Empleado} from '../models/empleado';
import {DatosEvento} from '../models/datos-evento';
import {FormEmpleadoComponent} from './form-empleado.component';
import {ListaEmpleadosComponent} from './lista-empleados.component';
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'home',
    templateUrl: BASE_URL + '/templates/home.template.html',
    providers: [EmpleadoService],
    directives: [FormEmpleadoComponent, ListaEmpleadosComponent]
})

export class HomeComponent {
    public listaEmpleados: Empleado[];
    public empleado: Empleado;

    constructor(private _empleadoService: EmpleadoService) {
        this.empleado = new Empleado();
        this.listaEmpleados = [];
    };

    ngOnInit() {
        this.getEmpleados();
    }

    getEmpleados() {
        this._empleadoService.getEmpleados().subscribe(
            data => {
                this.listaEmpleados = Empleado.fromJsonList(data.d.results);
            },
            err => { console.log("GET Empleados Error: " + err._body); },
            () => { /**/ }
        );
    }

    manejarEventos(arg: DatosEvento) {
        switch (arg.orden) {
            case "AGREGAR_A_LISTA":
                this.listaEmpleados.push(arg.datos);
                break;
        }
    }
}