import { Router } from "express";
import {register, login, logout, profile, loginAdmin, createAdmin, getAllUsers, deleteUser } from "../controllers/auth_controller.js";
const router = Router();
import { validateToken } from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, loginAdminSchema, createAdminSchema } from "../schemas/auth.schema.js";
import { sanitizeInput } from "../middlewares/sanitizer.middleware.js";
router.post("/register", sanitizeInput, validateSchema(registerSchema), register);

router.post('/login', sanitizeInput, validateSchema(loginSchema), login);

router.post('/loginAdmin', validateSchema(loginAdminSchema), loginAdmin);

router.post('/createAdmin', validateSchema(createAdminSchema), createAdmin);

router.get('/logout', validateToken,logout);

router.get('/profile', validateToken,profile);

router.get('/users', getAllUsers);

router.get('/data_sensors/all', validateToken, async (req, res) => {
    try {
      const allRecords = await data_sensorsSchema.find().populate('user');
      res.json(allRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.delete('/users/:userId', validateToken, deleteUser);

export default router;