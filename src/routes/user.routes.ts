import { Router } from "express";
import * as  userController from "../controller/userController";
import { authJwt,verifySignUp } from "../middlewares";

const router = Router();
//crear usuario
router.post('/',[authJwt.verifyToken,authJwt.isAdmin,verifySignUp.checkRolesExisted,verifySignUp.checkDuplicateUserNameOrEmail],userController.createUser);

export default router;
