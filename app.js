//CODIGO DE EXPRESS

import express from "express";
import fileUpload from "express-fileupload"; //para subir imagenes
import postRoutes from './rutas/post.routes.js';

import cors from "cors";

const app = express();

app.use(cors()); //para el error de cors

app.use(express.json()); //para que pueda leer json

//configuracion para subir imagenes
//*NOTA: al configurar esto hay que reiniciar nodemon y thunder client para que funcione
app.use(fileUpload({
    useTempFiles: true, //guardar las imagenes en alguna carpeta y no en memoria
    tempFileDir: './upload' // carpeta donde se guardaran las imagenes
}));

//aqui usamos esas rutas
app.use(postRoutes);

export default app;