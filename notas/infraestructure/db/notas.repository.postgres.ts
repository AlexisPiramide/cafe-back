import Cafe from "../../../cafes/domain/Cafe";
import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../../usuarios/domain/Usuario";
import Nota from "../../domain/Nota";
import notasRepository from "../../domain/notas.repository";

export default class notasRepositoryPostgres implements notasRepository{
    
    async getReviewedCafes(usuario: string): Promise<Nota[]> {
        const reviewedQuery = `
            SELECT notas.usuario, usuarios.password, notas.cafe, cafes.tipo, cafes.imagen, cafes.tienda, cafes.precio, notas.nota 
            FROM notas 
            INNER JOIN usuarios ON notas.usuario = usuarios.alias 
            INNER JOIN cafes ON notas.cafe = cafes.nombre 
            WHERE notas.usuario = '${usuario}';
        `;
        
        try {
            const reviewedRows: any[] = await executeQuery(reviewedQuery);
            const reviewedCafes: Nota[] = reviewedRows.map(row => ({
                usuario: { alias: row.usuario },
                cafe: {
                    nombre: row.cafe,
                    tipo: row.tipo,
                    imagen: row.imagen,
                    link: row.tienda
                },
                nota: row.nota,
            }));

            return reviewedCafes;
        } catch (error) {
            console.error('Error fetching reviewed cafes:', error);
            throw new Error('Failed to fetch reviewed cafes');
        }
    }


    async getNotReviewedCafes(usuario: string): Promise<Cafe[]> {
        const notReviewedQuery = `
            SELECT cafes.nombre, cafes.tipo, cafes.imagen, cafes.tienda, cafes.precio 
            FROM cafes 
            WHERE cafes.nombre NOT IN (
                SELECT cafe FROM notas WHERE usuario = '${usuario}'
            );
        `;
        
        try {
            const notReviewedRows: any[] = await executeQuery(notReviewedQuery);
            const notReviewedCafes: Cafe[] = notReviewedRows.map(row => ({
                nombre: row.nombre,
                tipo: row.tipo,
                imagen: row.imagen,
                link: row.tienda,
            }));

            return notReviewedCafes;
        } catch (error) {
            console.error('Error fetching not reviewed cafes:', error);
            throw new Error('Failed to fetch not reviewed cafes');
        }
    }


    async añadir(usuario: string, cafe: string, nota: number): Promise<Nota> {
        const insertQuery = `
            INSERT INTO notas (usuario, cafe, nota) 
            VALUES ('${usuario}', '${cafe}', ${nota}) 
            RETURNING usuario, cafe, nota;
        `;
        
        try {
            const result: any = await executeQuery(insertQuery);
            const newNota: Nota = {
                usuario: { alias: result.usuario },
                cafe: {
                    nombre: result.cafe,
                    tipo: '', 
                    imagen: '',
                    link: ''
                },
                nota: result.nota,
            };

            return newNota;
        } catch (error) {
            console.error('Error adding review:', error);
            throw new Error('Failed to add review');
        }
    }

    async modificar(usuario: string, cafe: string, nuevaNota: number): Promise<Nota> {
        const updateQuery = `
            UPDATE notas 
            SET nota = ${nuevaNota} 
            WHERE usuario = '${usuario}' AND cafe = '${cafe}' 
            RETURNING usuario, cafe, nota;
        `;
        
        try {
            const result: any = await executeQuery(updateQuery);
            if (!result) {
                throw new Error('Review not found');
            }
            const updatedNota: Nota = {
                usuario: { alias: result.usuario },
                cafe: {
                    nombre: result.cafe,
                    tipo: '', 
                    imagen: '',
                    link: ''
                },
                nota: result.nota,
            };

            return updatedNota;
        } catch (error) {
            console.error('Error modifying review:', error);
            throw new Error('Failed to modify review');
        }
    }

}