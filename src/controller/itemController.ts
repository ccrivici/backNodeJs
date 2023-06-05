import * as itemService from '../services/itemService';
import express from 'express'

const Item = require("../Models/Item");
const router = express.Router();
module.exports = router;

//AÑADIR ITEM
router.post('/item', async (req, res) => {
    const item = new Item({
        denominacion: req.body.denominacion,
        ubicacion: req.body.ubicacion,
        conjuntoEquipo: req.body.conjuntoEquipo,
        equipo: req.body.equipo,
        marcaModelo: req.body.marcaModelo,
        periocidad: req.body.periocidad,
        categoria: req.body.categoria
    })
    try {
        const data = await item.save();
        res.status(200).json(data)
    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
})

//OBTENER ITEM POR ID
router.get('/item/:id', async(req, res) => {
    try{
        const data = await Item.findById(req.params.id);
        if (data == null){
            res.send(`El elemento con id ${req.params.id} no existe`)
        }else{
            res.json(data);
        }
    }catch(error:any){
        res.status(500).json({message: error.message})
    }
})

//OBTENER TODOS LOS ITEMS
router.get('/item', async (_req, res) => {
    try {
        const data = await Item.find();
        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

//ACTUALIZAR ITEM
router.put('/item/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Item.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

//ELIMINAR ITEM
router.delete('/item/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Item.findByIdAndDelete(id)
        res.send(`El  elemento ${data._id} ha sido eliminado`)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

//PAGINACION 
router.post('/pagination`', async(req, res) => {
    res.send('Post API')
})