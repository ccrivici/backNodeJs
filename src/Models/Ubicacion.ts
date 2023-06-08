import mongoose from "mongoose";
import { Item, Mantenimiento } from "../types";

const ubicacionSchema = new mongoose.Schema({
    nombre: String,
  tipo: {
    type: String,
    enum: ['edificio', 'puerto'],
    message: 'El valor debe ser edificio o puerto'
  },
  items:{
    type: Array,
    message: 'El valor debe ser un array'
  },
  mantenimientos:{
    type: Array,
    message: 'El valor debe ser un array'
  }
}, { versionKey: false, collection: 'Ubicaciones' });

module.exports = mongoose.model('Ubicacion', ubicacionSchema);

