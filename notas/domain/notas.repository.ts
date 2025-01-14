import Nota from "./Nota";
import Cafe from "./../../cafes/domain/Cafe"
export default interface notasRepository{
    getReviewedCafes(usuario: string): Promise<Nota[]>
    getNotReviewedCafes(usuario: string): Promise<Cafe[]> 

    añadir(usuario: string, cafe: string, nota: number): Promise<Nota>;
    modificar(usuario: string, cafe: string, nuevaNota: number): Promise<Nota>;
}