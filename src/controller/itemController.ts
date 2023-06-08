const { validationResult } = require('express-validator');
import express from 'express'
import { PaginationEntity } from '../Models/PaginationEntity';
import { Pagination } from '../types';
import {authJwt} from '../middlewares'; '../middlewares';
const Items = require("../Models/Item");
const router = express.Router();
module.exports = router;


    
//AÑADIR ITEM
router.post('/item', async (req, res) => {
    const item = new Items({
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
        const data = await Items.findById(req.params.id);
        if (data == null){
            res.send(`El elemento con id ${req.params.id} no existe`)
        }else{
            res.json(data);
        }
    }catch(error:any){
        res.status(500).json({message: error.message})
    }
})

//OBTENER TODOS LOS ITEMS //middlewares para controlar que el usuario tiene un token válido y tiene el rol moderador
router.get('/item', [authJwt.verifyToken, authJwt.isModerator],async (_req:any, res:any) => {
    try {
        const data = await Items.find();
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
        //devuelve el documento actualizado en la respuesta
        const options = { new: true };

        const result = await Items.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

//ELIMINAR ITEM
router.delete('/item/:id',authJwt.verifyToken, async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Items.findByIdAndDelete(id)
        res.send(`El  elemento ${data._id} ha sido eliminado`)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

//PAGINACION 
router.post('/item/pagination', async(req, res) => {
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
   
    var resultados = await PaginationEntity.paginationByFilter(pagination,"Items")
    res.send(resultados);
})