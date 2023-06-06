import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    //_id:mongoose.SchemaTypes.ObjectId,
    descripcion:String,
    estado:String,
    corregido:String,
    observaciones:String,
    ubicacion_id:String,
    periocidad:String,
    item_id:String,
    imagenes:Array<String>,
    fecha:Date
}, { versionKey: false, collection: 'Mantenimientos' });

module.exports = mongoose.model('Mantenimiento', mantenimientoSchema);

