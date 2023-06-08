import express from 'express'
import { PaginationEntity } from '../Models/PaginationEntity';
import { Pagination } from '../types';

const Mantenimiento = require("../Models/Mantenimiento");
const router = express.Router();
module.exports = router;

//AÑADIR MANTENIMIENTO
router.post('/mantenimiento', async (req, res) => {
    const mantenimiento = new Mantenimiento({
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        corregido: req.body.corregido,
        observaciones: req.body.observaciones,
        ubicacion_id: req.body.ubicacion_id,
        periocidad: req.body.periocidad,
        item_id: req.body.item_id,
        fecha: req.body.fecha
    })
    try {
        const data = await mantenimiento.save();
        res.status(200).json(data)
    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
})

//OBTENER MANTENIMIENTO POR ID
router.get('/mantenimiento/:id', async (req, res) => {
    try {
        const data = await Mantenimiento.findById(req.params.id);
        if (data == null) {
            res.send(`El elemento con id ${req.params.id} no existe`)
        } else {
            res.json(data);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

//OBTENER TODOS LOS MANTENIMIENTOS
router.get('/mantenimiento', async (_req, res) => {
    try {
        const data = await Mantenimiento.find();
        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

//ACTUALIZAR MANTENIMIENTO
router.put('/mantenimiento/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        
        //devuelve el documento actualizado en la respuesta
        const options = { new: true };

        const result = await Mantenimiento.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//ELIMINAR MANTENIMIENTO
router.delete('/mantenimiento/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Mantenimiento.findByIdAndDelete(id)
        res.send(`El  elemento ${data._id} ha sido eliminado`)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

//PAGINACION 
router.post('/mantenimiento/pagination', async (req, res) => {
    if (!req.body.filterValue ){
        var pagination:Pagination = {
            PageSize: req.body.pageSize,
            Page: req.body.page,
            Sort: req.body.sort,
            SortDirection: req.body.sortDirection,
            Filter: ''
        }
    }else{
        var pagination:Pagination = {
            PageSize: req.body.pageSize,
            Page:req.body.page,
            Sort:req.body.sort,
            SortDirection:req.body.sortDirection,
            Filter:req.body.filter,
            FilterValue:{
                Propiedad:req.body.filterValue.propiedad,
                Valor:req.body.filterValue.valor
            }        
        }
    }
   
    var resultados = await PaginationEntity.paginationByFilter(pagination,"Mantenimientos")
    res.send(resultados);
})