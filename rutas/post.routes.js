//TODAS LAS RUTAS DE LAS PUBLICACIONES

import { Router } from "express";
import { actualizarPublicacion, borrarPublicacion, crearPublicacion, publicacion, publicaciones } from "../controladores/post.controllers.js";

const router = Router();

//cuando yo visite la pagina principal, mostramos mensaje
//router.get('/', (req, res) => res.send('Putos'));

//rutas
//para mostrar todos los post que haya en base de datos
router.get('/posts', publicaciones);

//para crear o subir publicaciones nuevas
router.post('/posts', crearPublicacion);

//para actualizar una publicacion. ":id", eso es un REQUEST PARAMS
router.put('/posts/:id', actualizarPublicacion);

//para borrar una publicacion
router.delete('/posts/:id', borrarPublicacion);

//para mostrar solo un post en especifico
router.get('/posts/:id', publicacion);

export default router;