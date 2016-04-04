import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './components/app.component'

const COMPONENT_BASE_PATH = './app/components/todos';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])