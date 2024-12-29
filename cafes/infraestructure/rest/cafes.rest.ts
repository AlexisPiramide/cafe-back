import express, { Request, Response } from "express";
import cafeRepository from "../../domain/cafes.repository";
import CafesRepositoryPostgres from "../db/cafes.repository.postgres";
import cafesUsecases from "../../application/cafes.usecases";
import Cafe from "../../domain/Cafe";


const cafesRepositoryPostgres : cafeRepository = new CafesRepositoryPostgres();

const cafesusecases = new cafesUsecases(cafesRepositoryPostgres);

const router = express.Router();

router.get("/cafes", async (req: Request, res: Response) => {
    try{
        const cafes : Cafe[] = await cafesusecases.listar();
        res.json(cafes);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

router.post("/cafes", async (req: Request, res: Response) => {
    try{
        const cafe : Cafe = req.body;
        const cafeAñadido : Cafe = await cafesusecases.añadir(cafe);
        res.json(cafeAñadido);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get("/cafes/:nombre", async (req: Request, res: Response) => {
    try{
        const nombre : string = req.params.nombre;
        const cafe : Cafe = await cafesusecases.buscar(nombre);
        res.json(cafe);
    }catch(error){
        switch(error.status){
            case 404:
                return res.status(404).json({error: error.message});
            case 500:
                return res.status(500).json({error: error.message});
        }
    }
});

router.delete("/cafes/:nombre", async (req: Request, res: Response) => {
    try{
        const nombre : string = req.params.nombre;
        const cafe : Cafe = await cafesusecases.borrar(nombre);
        res.json(cafe);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});




export default router;