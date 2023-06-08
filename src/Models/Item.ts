import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    //_id:mongoose.SchemaTypes.ObjectId,
    denominacion: {
        type: String,
        required: [true, `Debes introducir la denominación`]
    },
    ubicacion: {
        type: String,
        required: [true, `Debes introducir la ubicacion`],
    },
    conjuntoEquipo: {
        type: String,
        required: [true, `Debes introducir el conjuntode equipo`]
    },
    equipo: {
        type: String,
        validate: {
            validator: function(value:any) {
              return value.trim() !== ""; // Comprueba que el valor no sea una cadena vacía después de eliminar los espacios en blanco.
            },
            message: 'El campo equipo no puede estar vacío'
          }
        },
    marcaModelo: {
        type: String,
        required: [true, `Debes introducir la marca o modelo`]
    },
    periocidad: {
        type: String,
        enum: ['diaria', 'semanal', 'mensual', 'trimestral'],
        message: `La periocidad debe ser: diaria, semanal, mensual o trimestral`,
        required: [true, `Debes introducir la periocidad`]
    },
    categoria: {
        type: String,
        required: [true, `Debes introducir la categoría`]
    },
}, { versionKey: false, collection: 'Items' });

module.exports = mongoose.model('Items', itemSchema);

