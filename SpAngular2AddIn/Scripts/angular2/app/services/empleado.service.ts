import {Empleado} from '../models/empleado';
import 'rxjs/add/operator/map';
import {Http, Response, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class EmpleadoService {
    private spApiUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.spApiUrl = _spPageContextInfo.webServerRelativeUrl;
        this.headers = new Headers();

        this.setHeaders();
    }

    setHeaders() {
        var digest = document.getElementById('__REQUESTDIGEST').value;

        this.headers.append('accept', 'application/json;odata=verbose');
        this.headers.append('content-type', 'application/json;odata=verbose');
        this.headers.append('X-RequestDigest', digest);
    }

    getDePrueba() {
        return this.http.get('https://restcountries.eu/rest/v1/capital/madrid').map((res: Response) => res.json());
    }

    getEmpleados() {
        return this.http.get(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items", { headers: this.headers }).map((res: Response) => res.json());
    }

    addEmpleado(empleado: Empleado) {
        var obj = {
            '__metadata': { 'type': 'SP.Data.EmpleadosListItem' },
            'Nombre': empleado.nombre,
            'Apellidos': empleado.apellidos,
            'Puesto': empleado.puesto,
            'Salario': empleado.salario.toString()
        };

        var data = JSON.stringify(obj);

        return this.http.post(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items", data, { headers: this.headers }).map((res: Response) => res.json());
    }

}