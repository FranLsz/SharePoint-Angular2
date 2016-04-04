import {Persona} from '../models/persona'
import {ROUTER_DIRECTIVES, RouteConfig, Router, Location, Route, AsyncRoute} from 'angular2/router';
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'app-main',
    templateUrl: '../Scripts/angular2/app/templates/app.template.html',
    directives: [ROUTER_DIRECTIVES],
})

export class AppComponent {
    public persona: Persona;

    constructor() {
        this.persona = { nombre: "Fran", edad: 20 }
    }

    ngOnInit() {
        var context = SP.ClientContext.get_current();
        console.log(context);
    }
}
