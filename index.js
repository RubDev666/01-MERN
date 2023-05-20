//AQUI INICIA TODO EL FLUJO DEL CODIGO

import { conectarMONGO } from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js"; //express


conectarMONGO(); //base de datos mongo

app.listen(PORT);

console.log('Servidor oyendo en...', PORT); // arranca con "node server/index.js" en terminal o con nodemon, "npm run dev"

//si queremos comprobar en la web
//http://localhost:4000/