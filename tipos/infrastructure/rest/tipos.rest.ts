import express, { Request, Response } from "express";

import tiposRepository from '../../domain/tipos.repository';
import tiposUsecases from '../../application/tipos.usecases';
import tiposRepositoryPostgres from "../db/tipos.repository.postgres";


const tiposrepository: tiposRepository = new tiposRepositoryPostgres();

const tiposusecases: tiposUsecases = new tiposUsecases(
    tiposrepository
);

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const tipos = await tiposusecases.listar();
    res.json(tipos);
});


export default router;