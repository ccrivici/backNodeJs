import express from 'express'

const Ubicacion = require("../Models/Ubicacion");
const router = express.Router();
module.exports = router;

//AÑADIR MANTENIMIENTO
router.post('/ubicacion', async (req, res) => {
    const ubicacion = new Ubicacion({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        items: req.body.items,
        mantenimientos: req.body.mantenimientos,
    })
    try {
        const data = await ubicacion.save();
        res.status(200).json(data)
    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
})

//OBTENER MANTENIMIENTO POR ID
router.get('/ubicacion/:id', async (req, res) => {
    try {
        const data = await Ubicacion.findById(req.params.id);
        if (data == null) {
            res.send(`La ubicacion con id ${req.params.id} no existe`)
        } else {
            res.json(data);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

//OBTENER TODOS LOS MANTENIMIENTOS
router.get('/ubicacion', async (_req, res) => {
    try {
        const data = await Ubicacion.find();
        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

//ACTUALIZAR MANTENIMIENTO
router.put('/ubicacion/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Ubicacion.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//ELIMINAR MANTENIMIENTO
router.delete('/ubicacion/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Ubicacion.findByIdAndDelete(id)
        res.send(`El  elemento ${data._id} ha sido eliminado`)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//PAGINACION 
router.post('/pagination`', async (req, res) => {
    res.send('Post API')
})