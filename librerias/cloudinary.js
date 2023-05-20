//PARA CONFIGURAR CLOUDINARY (para guardar imagenes)

/* INSTRUCIONES CLOUDINARY

- crear cuenta en cloudinary.com
- crear una carpeta (opcional)

*/

import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_URL } from '../config.js';

//configurar cloudinary
//el name, api key, api secret, esta en cloudinary.com, en dashboard
cloudinary.config({
    //cloud_name: "dkav9fvlo",
    //api_key: "656778812539119",
    //api_secret: "szFDb-3b3SWfvsRGsC1Cmbr8Nn0"
    CLOUDINARY_URL //con variable de entorno
});

//para subir la imagen a cloudinary
export const uploadImg = async img => {
    return await cloudinary.uploader.upload(img, {
        folder: '01-MERN-img', //si esta carpeta no existe, la crea
    })
}

//para eliminar la imagen de claudinary
export const removeImg = async id => {
    return await cloudinary.uploader.destroy(id);
}