import {Empleado} from '../models/empleado';
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'home',
    templateUrl: BASE_URL + '/templates/home.template.html',
    providers: [EmpleadoService]
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

    onSelect(empleado: Empleado) {
        this._empleadoService.deleteEmpleado(empleado).subscribe(
            data => {
                var i = this.listaEmpleados.map(function (e) { return e.id; }).indexOf(empleado.id);
                this.listaEmpleados.splice(i, 1);
            },
            err => {
                console.log("DELETE Empleados Error: " + err._body);
            },
            () => { /**/ }
        );

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

    addEmpleado() {
        this._empleadoService.addEmpleado(this.empleado).subscribe(
            data => {
                this.listaEmpleados.push(Empleado.fromJson(data.d));
            },
            err => { console.log("POST Empleados Error: " + err._body); },
            () => { /**/ }
        );
    }
}