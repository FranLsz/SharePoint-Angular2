﻿import {Empleado}                   from '../models/empleado';
import 'rxjs/add/operator/map';
import {Http, Response, Headers}    from 'angular2/http';
import {Injectable}                 from 'angular2/core';

@Injectable()
export class EmpleadoService {

    private spApiUrl: string;

    constructor(private http: Http) {
        this.spApiUrl = _spPageContextInfo.webServerRelativeUrl;
    }

    // SET HEADERS
    setHeaders(verb?: string) {
        var headers = new Headers();

        var digest = document.getElementById('__REQUESTDIGEST').value;
        headers.set('Accept', 'application/json;odata=verbose');
        headers.set('X-RequestDigest', digest);

        switch (verb) {
            case "POST":
                headers.set('Content-type', 'application/json;odata=verbose');
                break;
            case "PUT":
                headers.set('Content-type', 'application/json;odata=verbose');
                headers.set("IF-MATCH", "*");
                headers.set("X-HTTP-Method", "MERGE");
                break;
            case "DELETE":
                headers.set("IF-MATCH", "*");
                headers.set("X-HTTP-Method", "DELETE");
                break;
        }

        return headers;
    }

    // GET
    getEmpleados() {
        return this.http.get(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items", { headers: this.setHeaders() }).map((res: Response) => res.json());
    }

    // POST
    addEmpleado(empleado: Empleado) {

        var obj = {
            '__metadata': { 'type': 'SP.Data.EmpleadosListItem' },
            'Nombre': empleado.nombre,
            'Apellidos': empleado.apellidos,
            'Puesto': empleado.puesto,
            'Salario': empleado.salario.toString()
        };

        var data = JSON.stringify(obj);
        return this.http.post(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items", data, { headers: this.setHeaders("POST") }).map((res: Response) => res.json());
    }

    // PUT
    putEmpleado(empleado: Empleado) {

        var obj = {
            '__metadata': { 'type': 'SP.Data.EmpleadosListItem' },
            'Nombre': empleado.nombre,
            'Apellidos': empleado.apellidos,
            'Puesto': empleado.puesto,
            'Salario': empleado.salario.toString()
        };

        var data = JSON.stringify(obj);
        return this.http.post(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items(" + empleado.id + ")", data, { headers: this.setHeaders("PUT") });
    }

    // DELETE
    deleteEmpleado(empleado: Empleado) {
        return this.http.post(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items(" + empleado.id + ")", null, { headers: this.setHeaders("DELETE") });
    }

}