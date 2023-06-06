import mongoose, { Collection, CollectionBase } from "mongoose"
import { FilterValueClass, Item } from "../types"
const Items = require("../Models/Item");
export class PaginationEntity {

    PageSize!: Number
    Page!: Number
    Sort!: string
    SortDirection!: string
    Filter!: string
    FilterValue!: FilterValueClass
    Pagequantity!: Number
    Data!: Array<Item>
    TotalRows!: Number
    coleccion!:Collection

    constructor() {
        this.PageSize = 4
        this.Page
        this.Sort 
        this.SortDirection = "asc"
        this.Filter 
        this.FilterValue //= {"propiedad":"carlos","valor":"3"}
        this.Pagequantity
        this.Data
        this.TotalRows
        this.coleccion
    }

    async paginationByFilter(pagination:PaginationEntity) {

        var _collection = Items;

        let sort = _collection.sort().Ascending(pagination.Sort)
        if (pagination.SortDirection === 'desc') {
            _collection.sort().Descending(pagination.Sort)
        }
        
        //let filter;
        if (pagination.Filter === "") {
            pagination.Data = await _collection.find(/* p=>true*/).Sort(sort).Skip().Limit().ToListAsync();

          const valueFilter = `.*${pagination.FilterValue.Valor}.*`;
          filter = { [pagination.FilterValue.Propiedad]: { $regex: new RegExp(valueFilter, 'i') } };
        }
      
        const totalDocuments = await _collection.countDocuments(filter);
      
        let data;
        if (filter) {
          data = await _collection.find(filter)
            .sort(sort)
            .skip((pagination.Page - 1) * pagination.PageSize)
            .limit(pagination.PageSize)
            .toArray();
        } else {
          data = await _collection.find({})
            .sort(sort)
            .skip((pagination.Page - 1) * pagination.PageSize)
            .limit(pagination.PageSize)
            .toArray();
        }
      
        const rounded = Math.ceil(totalDocuments / pagination.PageSize);
        const totalPages = parseInt(rounded);
        
        const result = {
          ...pagination,
          Data: data,
          Pagequantity: totalPages,
          TotalRows: parseInt(totalDocuments)
        };
        
        return result;
      }

      /*
async paginationByFilter(pagination:PaginationEntity) {
        let sort = ;
        //let _collection :Collection
        if (pagination.SortDirection === 'desc') {
          sort = { [pagination.Sort]: -1 };
        } else {
          sort = { [pagination.Sort]: 1 };
        }
        
        let filter;
        if (pagination.FilterValue) {
          const valueFilter = `.*${pagination.FilterValue.Valor}.*`;
          filter = { [pagination.FilterValue.Propiedad]: { $regex: new RegExp(valueFilter, 'i') } };
        }
      
        const totalDocuments = await _collection.countDocuments(filter);
      
        let data;
        if (filter) {
          data = await _collection.find(filter)
            .sort(sort)
            .skip((pagination.Page - 1) * pagination.PageSize)
            .limit(pagination.PageSize)
            .toArray();
        } else {
          data = await _collection.find({})
            .sort(sort)
            .skip((pagination.Page - 1) * pagination.PageSize)
            .limit(pagination.PageSize)
            .toArray();
        }
      
        const rounded = Math.ceil(totalDocuments / pagination.PageSize);
        const totalPages = parseInt(rounded);
        
        const result = {
          ...pagination,
          Data: data,
          Pagequantity: totalPages,
          TotalRows: parseInt(totalDocuments)
        };
        
        return result;
      }

      */

}