import { Router } from "express";
import * as authController from '../controller/authController';
import { verifySignUp } from "../middlewares";
const router = Router();

router.post('/login',authController.singIn)
router.post('/registrar',[verifySignUp.checkDuplicateUserNameOrEmail,verifySignUp.checkRolesExisted],authController.singUp)


export default router;