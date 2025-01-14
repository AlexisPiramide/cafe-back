import Cafe from "../../cafes/domain/Cafe";
import Nota from "../domain/Nota";
import notasRepository from "../domain/notas.repository";


export default class notasUsecases {
    constructor(private notasrepository: notasRepository){}


    async getAll(usuario: string):Promise<any>{

        try{
            const reviewed : Nota[] = await this.notasrepository.getReviewedCafes(usuario);
            const unreviewed : Cafe[] = await this.notasrepository.getNotReviewedCafes(usuario);

            return {"usuario": usuario, "valorados":reviewed, "novalorados":unreviewed}

        }catch(error) {
            console.error(error);
            throw new Error("Error al listar los cafes");
        }
    }  
    
    async añadir(usuario: string, cafe: string, nota: number): Promise<Nota>{

        try{
            return this.notasrepository.añadir(usuario,cafe,nota);
        }catch(error) {
            console.error(error);
            throw new Error("Error al listar los cafes");
        }

    }

    async modificar(usuario: string, cafe: string, nuevaNota: number): Promise<Nota>{

        try{
            return this.notasrepository.modificar(usuario,cafe,nuevaNota);
        }catch(error) {
            console.error(error);
            throw new Error("Error al listar los cafes");
        }
    }
}