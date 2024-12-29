import Cafe from "../domain/Cafe";
import cafeRepository from "../domain/cafes.repository";

export default class cafeUsecases{
    constructor(private cafeRepository: cafeRepository) {}
    
    async listar(): Promise<Cafe[]> {
        try{
            return this.cafeRepository.listar();
        } catch (error) {
            console.error(error);
            throw new Error("Error al listar los cafes");
        }
    }
    async añadir(cafe: Cafe): Promise<Cafe> {
        try{
            return this.cafeRepository.añadir(cafe);
        } catch (error) {
            console.error(error);
            throw new Error("Error al añadir el cafe");
        }
    }
    async buscar(nombre: string): Promise<Cafe> {
        try{
            return this.cafeRepository.buscar(nombre);
        } catch (error) {
            console.error(error);
            throw new Error("Cafe no encontrado");
        }
    }
    async borrar(nombre: string): Promise<Cafe> {
        try{
            return this.cafeRepository.borrar(nombre);
        } catch (error) {
            console.error(error);
            throw new Error("Error al borrar el cafe");
        }
    }
}