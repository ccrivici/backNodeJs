import mongoose from "mongoose";
import { Item, Mantenimiento } from "../types";

const ubicacionSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    items: Array,
    mantenimientos: Array
}, { versionKey: false, collection: 'Ubicaciones' });

module.exports = mongoose.model('Ubicacion', ubicacionSchema);

