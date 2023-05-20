//el modelo de nuestra base de datos o de la informacion que le vamos a pasar

import mongoose from "mongoose";

//aqui se define todo el tipo de informacion que vamos a mandar
const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String, //tipo de dato
        required: true, //si es obligatorio, en este caso es si
        trim: true //para eliminar espacios en blanco al principio o final
    }, 
    descripcion: {
        type: String, 
        required: true,
        trim: true 
    },
    imagen: {
        url: String, //url de la imagen
        public_id: String, //id de la imagen
    } 
});

//'publicaciones' - ese nombre es el que se le da a la carpeta donde contendra cada publicacion en mongo, se puede crear en compas o si no existe la crea y ahi se queda...
export default mongoose.model('publicaciones', publicacionSchema);