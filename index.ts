import mongoose from "mongoose";
import { ConexionDb } from "./src/db/Conexion";
const Item = require("./src/Models/Item");
const express = require('express');
const routes = require('./src/controller/itemController')

const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("server inicicado en puerto 3000")
})

//conexion a la bbdd
const database = new ConexionDb('mongodb://localhost:27017/PuertoMongoDB')
database.connect();
//usar ruta
app.use('/api', routes);

/* async function añadir() {    
    try{
        const item = await Item.find({equipo:"asdad"})
        console.log(item)
    }catch(e:any){
        console.log(e.message)
    }
} */