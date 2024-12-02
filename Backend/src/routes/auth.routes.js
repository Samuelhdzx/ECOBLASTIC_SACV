import { Router } from "express";
import {register, login, logout, profile, getAllUsers} from "../controllers/auth_controller.js";
const router = Router();
import { authRequired } from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

router.post("/register", validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.get('/logout', authRequired,logout);

router.get('/profile', authRequired,profile);

router.get('/users', authRequired, getAllUsers);  




export default router;