import { collections } from "../../../context/mongo.db";
import Tipos from "../../domain/Tipos";
import tiposRepository from "../../domain/tipos.repository";

export default class tiposRepositoryMongo implements tiposRepository {

    async listar(): Promise<Tipos[]> {
        const tiposDB = await collections.tipos.find().toArray();

        if(!tiposDB) throw new Error("No hay tipos");
        else {
            const tipos: Tipos[] = tiposDB.map((tipo: any) => {
                return {
                    _id: tipo._id,
                    nombre: tipo.nombre,
                    descripcion: tipo.descripcion
                }
            });
            return tipos;
        }
    }


}