import "dotenv/config";
import express from "express";
import {conectar} from "./config/database.js"; 
import router from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
//configurar el motor de plantillas
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views")); //configuramos la carpeta donde van a estar nuestras vistas, es decir, nuestros archivos ejs

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", router); //vamos a usar router en app, es decir, en nuestro servidor
app .listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
} );
conectar();