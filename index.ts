import mongoose from "mongoose";
import { ConexionDb } from "./src/db/Conexion";
import authRoutes from './src/routes/auth.routes';
import {createRoles} from "./src/libs/initialSetup";
import userRoutes from "./src/routes/user.routes";
import cors from "cors";
import morgan from "morgan";
const Item = require("./src/Models/Item");
const express = require('express');
const ItemRoutes = require('./src/controller/itemController')
const MantenimientoRoutes= require('./src/controller/mantenimientoController')
const UbicacionRoutes = require('./src/controller/ubicacionController')
const app = express();


app.use(express.json());
//middleware para usar paquete de logs morgan
app.use(morgan('dev'))
app.listen(3000, () => {
    console.log("server iniciado en puerto 3000")
})

//conexion a la bbdd cambiar a mongodb7
const database = new ConexionDb('mongodb://localhost:27017/PuertoMongoDB')
database.connect();

//insertar roles en BBDD si no existen
createRoles();

//para permitir el cors
app.use(
    cors({
      // origin: "http://localhost:3000",
    })
  );

//middlewares de ruta
app.use('/api', ItemRoutes);
app.use('/api', MantenimientoRoutes);
app.use('/api', UbicacionRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)



/*
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
    UBICACION
    {
        "nombre": "edificio 1",
    "tipo":"edificio",
    "items": [],
    "mantenimientos": []
    }

*/