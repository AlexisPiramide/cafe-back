import Cafe from "../domain/Cafe";
import cafeRepository from "../domain/cafes.repository";
import uploadFile from "../../context/s3";
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
            const nombreArchivo = cafe.nombre + cafe.tipo + Math.floor(Math.random() * 2000 + 1).toString() + ".png";
            const result = await uploadFile(nombreArchivo);

            if(result){
                cafe.imagen = nombreArchivo;
                return this.cafeRepository.añadir(cafe);
            }else{
                throw new Error("Error al subir la imagen");
            }
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