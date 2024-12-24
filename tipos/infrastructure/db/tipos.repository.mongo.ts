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

    async poblar(): Promise<Tipos[]> {

        const tiposDB = await collections.tipos.insertMany([
            { "nombre": "Café Arábica" },
            { "nombre": "Café Robusta" },
            { "nombre": "Café Torrefacto" },
            { "nombre": "Café Orgánico" },
            { "nombre": "Café Descafeinado" },
            { "nombre": "Café Espresso" },
            { "nombre": "Café Moka" }
        ]);

        if(!tiposDB) throw new Error("No se han podido poblar los tipos");
        else {
            const result = await collections.tipos.find().toArray();
            const tipos: Tipos[] = result.map((tipo: any) => {
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

