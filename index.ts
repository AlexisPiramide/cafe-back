import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routerUsuarios from "./usuarios/infrastructure/rest/usuarios.rest";
import routerTipos from "./tipos/infrastructure/rest/tipos.rest";
import routerCafes from "./cafes/infraestructure/rest/cafes.rest";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

//routers
const api = "api/";
app.use(`/${api}usuarios`, routerUsuarios);
app.use(`/${api}tipos`, routerTipos);
app.use(`/${api}cafes`, routerCafes);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
