import executeQuery from "../../../context/postgres.connector";
import Tipo from "../../domain/Tipo";
import tiposRepository from "../../domain/tipos.repository";


export default class tiposRepositoryPostgres implements tiposRepository {
    
    
    async listar(): Promise<Tipo[]> {
        const query = `SELECT * FROM tipos`;
        const rows: any[] = await executeQuery(query);

        const tiposdb : Tipo[] = rows.map(row => {return {nombre: row.nombre}});

        return tiposdb;
    }


}
