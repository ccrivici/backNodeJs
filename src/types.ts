export interface Item {
    id: string,
    denominacion: string,
    ubicacion: string,
    conjuntoEquipo: string,
    equipo: string,
    marcaModelo: string,
    periocidad: string,
    categoria: string
}
export interface Ubicacion {
    id: string;
    nombre: string;
    tipo: string;
    items: Item[];
    mantenimientos: Mantenimiento[];
}

export interface Mantenimiento {
    id: string;
    descripcion: string;
    estado: string;
    corregido: boolean;
    observaciones: string;
    imagenes: string[];
    periocidad: string;
    fecha?: any;
    item_id: string;
    ubicacion_id: string;
}
export interface FilterValueClass{
    Propiedad:string,
    Valor:string
}
export interface Pagination{
    PageSize: number
    Page: number
    Sort: string
    SortDirection: string
    Filter?: string
    FilterValue?: FilterValueClass
    Pagesquantity?: number
    Data?: Array<Item>
    TotalRows?: number
}