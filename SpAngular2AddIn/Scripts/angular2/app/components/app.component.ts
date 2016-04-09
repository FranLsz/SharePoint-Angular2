import {Empleado} from '../models/empleado'
import {HomeComponent} from './home.component'
import {LoginComponent} from './login.component'
import {ROUTER_DIRECTIVES, RouteConfig, Router, Location, Route, AsyncRoute} from 'angular2/router';
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'app-main',
    templateUrl: BASE_URL + 'app/templates/app.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        component: HomeComponent,
        //useAsDefault: true,
        name: 'Home'
    },
    {
        path: '/login',
        component: LoginComponent,
        name: 'Login'
    }
])
export class AppComponent {
    public empleado: Empleado;

    constructor(router: Router) {
        this.empleado = new Empleado("Fran", "López", "Desarrollo",76976)
        router.navigate(['/Home']);
        
    }

    ngOnInit() {
        //var context = SP.ClientContext.get_current();
        //console.log(context);
    }
}
