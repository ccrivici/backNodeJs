import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    //_id:mongoose.SchemaTypes.ObjectId,
    denominacion:String,
    ubicacion:String,
    conjuntoEquipo:String,
    equipo:String,
    marcaModelo:String,
    periocidad:String,
    categoria:String,
}, { versionKey: false });

module.exports= mongoose.model('items',itemSchema);

