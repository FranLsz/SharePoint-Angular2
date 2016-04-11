export class Empleado {

    id: number;
    nombre: string;
    apellidos: string;
    puesto: string;
    salario: number;

    constructor();
    constructor(nombre: string, apellidos: string, puesto: string, salario: number);
    constructor(nombre: string, apellidos: string, puesto: string, salario: number, id: number) {

        if (nombre != undefined) {
            if (id != undefined)
                this.id = id;

            this.nombre = nombre;
            this.apellidos = apellidos;
            this.puesto = puesto;
            this.salario = salario;
        }
    }

    public detach() {
        return new Empleado(this.nombre, this.apellidos, this.puesto, this.salario, this.id);
    }

    public static fromJson(json: any) {
        return new Empleado(json.Nombre, json.Apellidos, json.Puesto, json.Salario, json.ID);
    }

    public static fromJsonList(json: any) {
        var list = [];
        for (var i = 0; i < json.length; i++) {
            list.push(Empleado.fromJson(json[i]));
        }
        return list;
    }
}