import "dotenv/config";
import express from "express";
import {conectar} from "./config/database.js"; 

const app = express();

app.get ("/", (req, res) => {
    res.send("Hola mundo");
});

app .listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
} );
conectar();