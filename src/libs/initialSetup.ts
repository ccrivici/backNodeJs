import Role from "../Models/Role";
/*
*   Esta función se encargar de añadir los roles en la bbdd si no existen
*/
export const createRoles = async () => {
    //contamos los roles que hay en la bbDD
    try{
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;
        //Si no hay creamos los 3 roles
        const values = await Promise.all([
            new Role({name:'user'}).save(),
            new Role({name:'admin'}).save(),
            new Role({name:'moderator'}).save(),
        ])
    
    }catch(e:any){
        console.error(e.message)
    }
    
}