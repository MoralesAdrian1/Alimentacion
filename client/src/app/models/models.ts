export class alimentosModel{
    _id?: string;
    categoriaAlimento:string="";
    nombreAlimento:string="";
    calorias:number=0;
}
export class categoriaModel{
    _id?: string;
    categoriaAlimento:string="";
}
export interface consumoModel{
    _id?: string;
    username:string;
    fechaComida:string;
    horaComida:string;
    comida:string;
    alimentos:{categoriaAlimento: string,
               nombreAlimento:String, 
               porcion:number, 
               calorias:number}[];
    
}