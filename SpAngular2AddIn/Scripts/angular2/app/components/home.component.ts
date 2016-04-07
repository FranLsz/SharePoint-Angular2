import {Empleado} from '../models/empleado';
import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'home',
    templateUrl: BASE_URL + 'app/templates/home.template.html',
    providers: [EmpleadoService]
})
export class HomeComponent {
    private spContext: any;
    public listaEmpleados: any;
    public empleado: Empleado;

    constructor(private _empleadoService: EmpleadoService) {
        this.spContext = SP.ClientContext.get_current();
        //console.log(this.spContext);
    };

    ngOnInit() {
        //this.getEmpleados();
        this.addEmpleado();
    }

    getEmpleados() {
        this._empleadoService.getEmpleados().subscribe(
            data => {
                this.listaEmpleados = data.d.results;

                $.each(this.listaEmpleados, function (i, empleado) {
                    console.log(empleado.Nombre);
                });
            },
            err => { console.log("GET error"); },
            () => { console.log("Empleados GET Finished"); }
        );
    }

    addEmpleado() {
        this.empleado = { nombre: 'Sofía', apellidos: 'López', puesto: 'Desarrollador', salario: 27750.25 }

        this._empleadoService.addEmpleado(this.empleado).subscribe(
            data => {
                this.getEmpleados();
            },
            err => { console.log("GET error"); },
            () => { console.log("Empleados POST Finished"); }
        );
    }
}