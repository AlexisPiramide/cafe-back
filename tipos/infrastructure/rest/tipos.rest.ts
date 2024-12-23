import express, { Request, Response } from "express";


import tiposRepositoryMongo from './../db/tipos.repository.mongo';
import tiposRepository from '../../domain/tipos.repository';
import tiposUsecases from '../../application/tipos.usecases';


const tiposrepository: tiposRepository = new tiposRepositoryMongo();

const tiposusecases: tiposUsecases = new tiposUsecases(
    tiposrepository
);

const router = express.Router();

router.get("/tipos", async (req: Request, res: Response) => {
    const tipos = await tiposusecases.listar();
    res.json(tipos);
});