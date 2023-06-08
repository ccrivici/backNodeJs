import { Request } from "express";
import { ROLES } from "../Models/Role";
import User from "../Models/User";

export const checkRolesExisted = (req: Request, res: any, next: any) => {
    if (req.body.roles)
        req.body.roles.forEach((rol: any) => {
            if (!ROLES.includes(rol)) {
                return res.status(400).json({ message: `The role ${rol} don´t exists` })
            }
        });
    next();
}

export const checkDuplicateUserNameOrEmail = async (req: Request, res: any, next: any) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) return res.status(400).json({ message: "The user already exists" })

        const email = await User.findOne({ email: req.body.email })
        if (email) return res.status(400).json({ message: "The email already exists" })
    } catch (error) {
        
    }

    next();
}