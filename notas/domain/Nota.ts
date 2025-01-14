import Usuario from "./../../usuarios/domain/Usuario" 
import Cafe from "./../../cafes/domain/Cafe"
export default interface Nota{
    usuario: Usuario
    cafe : Cafe
    nota : number
}