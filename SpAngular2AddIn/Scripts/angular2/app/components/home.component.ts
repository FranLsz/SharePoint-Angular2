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
    public listaEmpleados: Empleado[];
    public empleado: Empleado;
    public empleado2: Empleado;

    constructor(private _empleadoService: EmpleadoService) {
        //this.spContext = SP.ClientContext.get_current();
        this.listaEmpleados = [];
    };

    ngOnInit() {
        // this.getEmpleados();
        this.addEmpleado();
    }

    onSelect(empleado: Empleado) {
        alert("Seleccionado: " + empleado.nombre + ", " + empleado.salario);
    }

    getEmpleados() {
        this._empleadoService.getEmpleados().subscribe(
            data => {
                this.listaEmpleados = Empleado.fromJsonList(data.d.results);
            },
            err => { console.log("GET error"); },
            () => { console.log("Empleados GET Finished"); }
        );
    }

    addEmpleado() {
        this.empleado = new Empleado("Fran", "López", "Desarrollo", 123124)

        this._empleadoService.addEmpleado(this.empleado).subscribe(
            data => {
                this.getEmpleados();
            },
            err => { console.log("GET error"); },
            () => { console.log("Empleados POST Finished"); }
        );
    }
}