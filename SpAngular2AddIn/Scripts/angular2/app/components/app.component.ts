import {HomeComponent} from './home.component'
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {Component, OnInit} from 'angular2/core'

@Component({
    selector: 'app-main',
    templateUrl: BASE_URL + '/templates/app.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        component: HomeComponent,
        name: 'Home'
    }
])

export class AppComponent {

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/Home']);
        //var context = SP.ClientContext.get_current();
    }
}
