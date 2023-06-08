import config from '../../config'
import Role from '../Models/Role';
import User from '../Models/User';
import jwt from 'jsonwebtoken'

export const singUp = async (req: any, res: any) => {
    const { username, email, password, roles } = req.body;
    //comprobar que el usuario no existe
    const userFind = User.find({ email })

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })


    if (roles) {
        //busca si el rol existe en la base de datos
        const foundRoles = await Role.find({ name: { $in: roles } })
        //recorremos los roles encontrados y le asignamos el ide de cada rol al array de roles del usuario
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        //si el usuario no ingresa un rol le asigna el rol user
        const role: any = await Role.findOne({ name: "user" })
        //se lo asignamos al array de roles del usuario
        newUser.roles = await [(role._id).valueOf()];
        await console.log(`valor ${role._id}`)
    }

    const savedUser = await newUser.save();
    console.log(await savedUser)
    /*
    * el método sign permite crear un nuevo token con 2 parámetros, el primero es el objeto a guardar,
    * el 2do palabra secreta y el tercero opcional es un objeto de configuración
    */
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //24h
    })
    //devolvemos el token con un status 200
    res.status(200).json({ token })
}
/*
*   Este método se encarga de hacer el login
*/
export const singIn = async (req: any, res: any) => {
    //buscamos el usuario
    const userFound = await User.findOne({ email: req.body.email }).populate("roles") //populate se encarga de buscar las referencias de los roles del usuario en la colecion roles para mostrar el objeto entero
    //si no existe devolvemos un status 400
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña incorrecta" });
    //firmamos el token
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    console.log("user logged " + userFound)
    //devolvemos el token si todo ha ido correcto
    res.json({ token })

}