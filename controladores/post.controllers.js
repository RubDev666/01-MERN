//FUNCIONES QUE VAN A IR EN CADA SOLICITUD

//*NOTAAAAA, post es el nombre de la hoja, y hace referencia a las publicaciones
import post from '../models/post.js';
import { removeImg, uploadImg } from '../librerias/cloudinary.js'; //para subir imagenes

//para borrar imagen de la carpeta "upload", despues de guardarlo en cloudinary
import fs from 'fs-extra'; 

/*TOMA EN CUENTA LO SIGUIENTE:

(req, res), req, es lo que el cliente envia, y res, es lo que le vamos a enviar al cliente
*/

export const publicaciones = async (req, res) => {
    try {
        const publicaciones = await post.find(); //hace la consulta

        res.send(publicaciones); //y aqui manda lo que encontro en la base de datos
    
        //la base de datos por defecto si no encuentra nada manda un arreglo vacio
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}; 

export const crearPublicacion = async (req, res) => {
    try {
        const {titulo, descripcion} = req.body; //recibimos los datos del cliente y extraemos

        let imgDatos; // para almancenar id, y url de la imagen

        //para validar si hay una imagen o no
        if (req.files) {
            //console.log(req.files); //objeto que contiene los datos de la imagen
            //imagen, es el nombre de la imagen que le dimos

            const img = await uploadImg(req.files.imagen.tempFilePath);
            //console.log(img);

            //console.log(req.files.imagen.tempFilePath)

            //para borrar la imagen de la carpeta  'upload'
            await fs.remove(req.files.imagen.tempFilePath);

            imgDatos = {
                url: img.secure_url, //url segura (el que tiene candado)
                public_id: img.public_id // id de la imagen
            }
        }

        //esto es lo que se manda al schema o el modelo de los datos, y con los datos que estamos pasando aqui, se rellenan..., es decir que estos son los datos que el schema de "post.js" en "models" estan esperando recibir.
        const newPublicacion = new post({titulo, descripcion, imagen: imgDatos}); //creamos el nuevo dato
    
        await newPublicacion.save(); //lo guardamos en la base de datos

        return res.json(newPublicacion); //y le respondemos al cliente
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const actualizarPublicacion = async (req, res) => {
    try {
        const publicacionActualizada = await post.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send(publicacionActualizada);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const borrarPublicacion = async (req, res) => {
    try {
        const publicacionEliminada = await post.findByIdAndDelete(req.params.id);

        if(!publicacionEliminada) return res.sendStatus(404); // 404, no encontrado

        //si existe el post con imagen lo borra, si no, omite este if
        if(publicacionEliminada.imagen.public_id) {
            await removeImg(publicacionEliminada.imagen.public_id);
        }
    
        return res.sendStatus(204); //204, si encontrado
    } catch (error) {
        return res.status(500).json({message: error.message});   
    }
};

export const publicacion = async (req, res) => {
    try {
        const publicacion = await post.findById(req.params.id);

        if(!publicacion) return res.sendStatus(404); // 404, no encontrado
    
        return res.send(publicacion)
    } catch (error) {
        return res.status(500).json({message: error.message});   
    }
};
