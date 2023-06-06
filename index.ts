import mongoose from "mongoose";
import { ConexionDb } from "./src/db/Conexion";
const Item = require("./src/Models/Item");
const express = require('express');
const routes = require('./src/controller/itemController')
const MantenimientoRoutes= require('./src/controller/mantenimientoController')
const UbicacionRoutes = require('./src/controller/ubicacionController')

const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("server iniciado en puerto 3000")
})

//conexion a la bbdd
const database = new ConexionDb('mongodb://localhost:27017/PuertoMongoDB')
database.connect();
//usar ruta
app.use('/api', routes);
app.use('/api', MantenimientoRoutes);
app.use('/api', UbicacionRoutes);

/* async function añadir() {    
    try{
        const item = await Item.find({equipo:"asdad"})
        console.log(item)
    }catch(e:any){
        console.log(e.message)
    }
}
    ITEM
        {
        "denominacion": "pruesda",
        "ubicacion": "ubi prueba",
        "conjuntoEquipo": "conjuntoequipo2",
        "equipo": "equipoprueba",
        "marcaModelo": "marca prueba",
        "periocidad": "periocidadprueba",
        "categoria": "categoria"
}


    MANTENIMIENTO

    {
    "descripcion":"dads3",
    "estado":"dads",
    "corregido":"dads",
    "observaciones":"dads",
    "ubicacion_id":"dads",
    "periocidad":"dads",
    "item_id":"dads",
    "fecha":"04/05/2022"
}

*/