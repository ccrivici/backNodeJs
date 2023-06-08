import config from '../../config'
import jwt from 'jsonwebtoken'
import User from '../Models/User';
import Role from '../Models/Role';

/*
*   Esta funcion se encarga de verificar si se recibe un token y si es correcto
*/
export const verifyToken = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers["x-acces-token"];
        if (!token) return res.status(403).json({ message: "no se ha enviado ningún token" })

        //verificamos el token con la contraseña y obtenemos el valor almacenado dentro del token que era el _id
        const decoded: any = jwt.verify(token, config.SECRET)
        req.userId = decoded.id; //guardamos el id del token en el request para userlo en las funciones ismoderator() e isAdmin()

        //buscamos el usuario con el id del token y lo guardamos sin la contraseña
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "usuario no encontrado con el valor del token" })
        console.log(user)
        next();
    } catch (e: any) {
        console.log(e.message)
        res.status(500).json({message: "jwt malformado. Unauthorized" })
    }
}

/*
*Esta funcion verifica si el usuario es moderador
*/
export const isModerator = async (req: any, res: any, next: any) => {
    try {
        const user: any = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } })//buscamos en los roles si existe alguno de los roles del usuario
        var moderator = false;

        roles.forEach(rol => {
            if (rol.name === "admin") {
                moderator = true;
                return;
            }
        });
        if (moderator) {
            next();
        } else {
            return res.status(403).json({ message: "Rol de admin necesario" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
/*
*Esta funcion verifica si el usuario es admin
*/
export const isAdmin = async (req: any, res: any, next: any) => {
    try {
        const user: any = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } })//buscamos en los roles si existe alguno de los roles del usuario
        var moderator = false;

        roles.forEach(rol => {
            if (rol.name === "moderator") {
                moderator = true;
                return;
            }
        });
        if (moderator) {
            next();
        } else {
            return res.status(403).json({ message: "Rol de moderador necesario" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}