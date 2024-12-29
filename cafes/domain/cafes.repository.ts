import Cafe from "./Cafe";

export default interface cafeRepository {
    listar(): Promise<Cafe[]>;
    añadir(cafe: Cafe): Promise<Cafe>;
    buscar(nombre: string): Promise<Cafe>;
    borrar(nombre: string): Promise<Cafe>;
}
  
