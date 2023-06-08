import mongoose, { Collection, CollectionBase } from "mongoose"
import { FilterValueClass, Item, Pagination } from "../types"
const Items = require("../Models/Item");
const Mantenimientos = require("../Models/Mantenimiento");
const Ubicaciones = require("../Models/Ubicacion");
export class PaginationEntity {

    static async paginationByFilter(pagination: Pagination, coleccion: string) {
        var _collection;
        //esta linea controla que si no le hemos pasado en el cuerpo de la peticion el campo sort, lo establezca en " " para que no ordene y no de error
        if ((pagination.Sort != undefined && pagination.Sort.trim() === ""  ) || pagination.Sort == undefined) pagination.Sort = " ";
        
        switch (coleccion) {
            case "Items":
                _collection = Items;
                break;
            case "Mantenimientos":
                _collection = Mantenimientos;
                break;
            case "Ubicaciones":
                _collection = Ubicaciones;
                break;
        }

        var totalDocuments = 0;

        if (pagination.FilterValue == undefined) {
            pagination.Data = await _collection.find().sort({ [pagination.Sort]: pagination.SortDirection }).skip((pagination.Page - 1) * pagination.PageSize).limit(pagination.PageSize).exec();

            totalDocuments = await _collection.countDocuments()

        } else {

            const valueFilter = `.*${pagination.FilterValue!.Valor}.*`;
            const filter = { [pagination.FilterValue!.Propiedad]: { $regex: new RegExp(valueFilter, "i") } };

            pagination.Data = await _collection.find(filter)
                .sort({ [pagination.Sort]: pagination.SortDirection })
                .skip((pagination.Page - 1) * pagination.PageSize)
                .limit(pagination.PageSize)
                .exec();

            totalDocuments = await _collection.countDocuments({
                [pagination.FilterValue.Propiedad]: { $regex: valueFilter, $options: "i" }
            });
        }
        var totalPages = parseInt(Math.ceil(totalDocuments / parseFloat(pagination.PageSize + "")).toString());
        pagination.Pagesquantity = totalPages;
        pagination.TotalRows = totalDocuments
        return pagination;
    }
}