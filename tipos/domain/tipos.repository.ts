import Tipos from "./Tipos";

export default interface tiposRepository {
    listar(): Promise<Tipos[]>;
}