import {EmpleadoService} from '../services/empleado.service'
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'home',
    templateUrl: BASE_URL + 'app/templates/home.template.html',
    providers: [EmpleadoService]
})
export class HomeComponent {
    private spContext: any;
    public pruebadata: any;

    constructor(private _personaService: EmpleadoService) {
        this.spContext = SP.ClientContext.get_current();
        console.log(this.spContext);
    };

    ngOnInit() {
        this._personaService.getPersonas().subscribe(
            data => {
                this.pruebadata = data;
                console.log("GET OK");
                console.log(JSON.stringify(this.pruebadata));
            },
            err => { console.log("GET error"); },
            () => { console.log("GET finished"); }
        );
    }
}