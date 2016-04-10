import {Empleado} from '../models/empleado';
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'lista-empleados',
    templateUrl: BASE_URL + '/templates/lista-empleados.template.html',
    providers: [EmpleadoService],
    inputs: ['listaEmpleados']
})

export class ListaEmpleadosComponent {
    public listaEmpleados: Empleado[];

    constructor(private _empleadoService: EmpleadoService) {
        this.listaEmpleados = [];
    };

    onSelect(empleado: Empleado) {
        this._empleadoService.deleteEmpleado(empleado).subscribe(
            data => {
                var i = this.listaEmpleados.map(function (e) { return e.id; }).indexOf(empleado.id);
                this.listaEmpleados.splice(i, 1);
            },
            err => {
                console.log("DELETE Empleados Error: " + err._body);
            }
        );
    }
}