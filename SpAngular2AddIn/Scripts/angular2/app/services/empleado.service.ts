import {Empleado} from '../models/persona';
import 'rxjs/add/operator/map';
import {Http, Response, Headers} from 'angular2/http';
import {Injectable, OnInit} from 'angular2/core';

@Injectable()
export class EmpleadoService {
    private spApiUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.spApiUrl = _spPageContextInfo.webServerRelativeUrl;
        this.headers = new Headers();
        console.log("ON INIT");
        var digest = document.getElementById('__REQUESTDIGEST').value;

        this.headers.append('accept', 'application/json;odata=verbose');
        //this.headers.append('content-type', 'application/json;odata=verbose');
        //this.headers.append('X-RequestDigest', digest);
        console.log(digest);
        console.log(this.headers);
    }
    

    getDePrueba() {
        return this.http.get('https://restcountries.eu/rest/v1/capital/madrid').map((res: Response) => res.json());
    }

    getPersonas() {
        return this.http.get(this.spApiUrl + "/_api/web/lists/getByTitle('Empleados')/items", {headers: this.headers}).map((res: Response) => res.json());
    }

}