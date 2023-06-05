import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    //_id:mongoose.SchemaTypes.ObjectId,
    Descripcion:String,
    Estado:String,
    Corregido:String,
    Observaciones:String,
    Ubicacion_id:String,
    Periocidad:String,
    Item_id:String,
    Imagenes:Array<String>,
    fecha:Date
}, { versionKey: false });

module.exports = mongoose.model('Mantenimientos', mantenimientoSchema);

