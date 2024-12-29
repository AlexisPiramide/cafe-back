import Tipos from "./Tipo";

export default interface tiposRepository {
    listar(): Promise<Tipos[]>;
    poblar(): Promise<Tipos[]>;
}