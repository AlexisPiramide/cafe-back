import executeQuery from '../../../context/postgres.connector';

import Cafe from "../../domain/Cafe";
import cafeRepository from "../../domain/cafes.repository";

export default class CafesRepositoryPostgres implements cafeRepository {
    
    async listar(): Promise<Cafe[]> {
        const query = "SELECT * FROM cafes";

        try{
            const rows : any[] = await executeQuery(query);
            
            const cafes : Cafe[] = rows.map(row => {
                return {
                    nombre: row.nombre,
                    tipo: row.tipo,
                    imagen: row.imagen,
                    link: row.link
                }
            });

            return cafes;
            
        } catch (error) {
            console.error(error);
            throw new Error("Error al listar los cafes");
        }
    }
    async añadir(cafe: Cafe): Promise<Cafe> {
        const query = `INSERT INTO cafes (nombre, tipo, imagen, link) VALUES ('${cafe.nombre}', '${cafe.tipo}', '${cafe.imagen}', '${cafe.link}') RETURNING *`;
        try {
            const rows : any[] = await executeQuery(query);
            const cafe : Cafe = {
                nombre: rows[0].nombre,
                tipo: rows[0].tipo,
                imagen: rows[0].imagen,
                link: rows[0].link
            }
            return cafe;

        } catch (error) {
            console.error(error);
            throw new Error("Error al añadir el cafe");
        }

    }
    async buscar(nombre: string): Promise<Cafe> {
        const query = `SELECT * FROM cafes WHERE nombre = '${nombre}'`;
        try {
            const rows : any[] = await executeQuery(query);
            if (rows.length === 0) {
                throw new Error("Cafe no encontrado");
            }
            const cafe : Cafe = {
                nombre: rows[0].nombre,
                tipo: rows[0].tipo,
                imagen: rows[0].imagen,
                link: rows[0].link
            }
            return cafe;

        } catch (error) {
            console.error(error);
            throw new Error("Error al buscar el cafe");
        }
    }
    
    async borrar(nombre: string): Promise<Cafe> {
        const query = `DELETE FROM cafes WHERE nombre = '${nombre}' RETURNING *`;

        try {
            const rows : any[] = await executeQuery(query);
            if (rows.length === 0) {
                throw new Error("Cafe no encontrado");
            }
            const cafe : Cafe = {
                nombre: rows[0].nombre,
                tipo: rows[0].tipo,
                imagen: rows[0].imagen,
                link: rows[0].link
            }
            return cafe;

        } catch (error) {
            console.error(error);
            throw new Error("Error al borrar el cafe");
        }
    }

}