export class Empleado {
    nombre: string;
    apellidos: string;
    puesto: string;
    salario: number;

    constructor(nombre: string, apellidos: string, puesto: string, salario:number) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.puesto = puesto;
        this.salario = salario;
    }

    public static fromJson(json: any) {
        return new Empleado(json.Nombre, json.Apellidos, json.Puesto, json.Salario);
    }

    public static fromJsonList(json: any) {
        var list = [];
        for (var i = 0; i < json.length; i++) {
            list.push(Empleado.fromJson(json[i]));
        }
        return list;
    }
}