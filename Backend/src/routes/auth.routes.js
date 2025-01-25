import { Router } from "express";
import {register, login, logout, profile, loginAdmin, createAdmin } from "../controllers/auth_controller.js";
const router = Router();
import { authRequired } from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, loginAdminSchema, createAdminSchema } from "../schemas/auth.schema.js";

router.post("/register", validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/loginAdmin', validateSchema(loginAdminSchema), loginAdmin);

router.post('/createAdmin', validateSchema(createAdminSchema), createAdmin);

router.get('/logout', authRequired,logout);

router.get('/profile', authRequired,profile);




router.get('/data_sensors/all', authRequired, async (req, res) => {
    try {
      const allRecords = await data_sensorsSchema.find().populate('user');
      res.json(allRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  




export default router;