import Tipos from "../domain/Tipos";
import tiposRepository from "../domain/tipos.repository";

export default class tiposUsecases{
    constructor(private tiposRepository: tiposRepository) {}

    async listar(): Promise<Tipos[]> {
        return this.tiposRepository.listar();
    }

}