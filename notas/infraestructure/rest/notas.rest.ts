import express, { Request, Response } from "express";
import notasRepository from "../../domain/notas.repository";
import NotasRepositoryPostgres from "../db/notas.repository.postgres";
import notasUsecases from "../../application/notas.usecases";

import {isAuth} from "../../../context/security/auth"


const notasRepositoryPostgres : notasRepository = new NotasRepositoryPostgres();

const notasusecases = new notasUsecases(notasRepositoryPostgres);

const router = express.Router();

router.get("/",isAuth,async (req: Request, res: Response) => {
    try {
        const alias = req.body
        const notas: any[]= await notasusecases.getAll(alias)
        res.json(notas);
    } catch (error) {
        
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {

            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

router.post("/añadir", isAuth, async (req: Request, res: Response) => {
    const { usuario, cafe, nota } = req.body;
    if (!usuario || !cafe || !nota) {
        return res.status(400).json({ error: "Missing required fields (usuario, cafe, nota)" });
    }
    
    try {
        const newNota = await notasusecases.añadir(usuario, cafe, nota);
        res.status(201).json(newNota);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

router.put("/modificar", isAuth, async (req: Request, res: Response) => {
    const { usuario, cafe, nuevaNota } = req.body;
    if (!usuario || !cafe || nuevaNota === undefined) {
        return res.status(400).json({ error: "Missing required fields (usuario, cafe, nuevaNota)" });
    }

    try {
        const updatedNota = await notasusecases.modificar(usuario, cafe, nuevaNota);
        res.status(200).json(updatedNota);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

export default router;