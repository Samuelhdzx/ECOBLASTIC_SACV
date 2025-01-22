import User from "../models/user_model.js";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

    export const register = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: passwordHash
            });

            const userSaved = await newUser.save();
            const token = await createAccessToken({ id: userSaved._id });
            res.cookie("token", token);
            res.json ({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    export const login = async (req, res) => {
        const { email, password } = req.body;
        try {

            const userFound = await User.findOne({ email });
            if (!userFound) return res.status(400).json({ message: "Uusario no encontrado" });

            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
            res.json ({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });

        } catch (error) {
            res.status(500).json
        }
    };

    export const logout = (req, res) => {
        res.cookie("token", "", {
            expires: new Date(0)
        });
        return res.status(200).json({ redirectTo: '/inicio' });
    };
    

    export const profile = async (req, res) => {
        const userFound= await User.findById(req.user.id)
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
        res.send("profile");
    };

    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.find({}, {
                password: 0,  // Exclude password from the response
                __v: 0       // Exclude version key
            });
            
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    export const createAdmin = async (req, res) => {
        const { username, adminId, password } = req.body;
        try {
            // Verify if adminId already exists
            const adminExists = await Admin.findOne({ adminId });
            if (adminExists) {
                return res.status(400).json({ message: "Admin ID already exists" });
            }
    
            const passwordHash = await bcrypt.hash(password, 10);
    
            const newAdmin = new Admin({
                username,
                adminId,
                password: passwordHash
            });
    
            const adminSaved = await newAdmin.save();
            const token = await createAccessToken({ id: adminSaved._id });
            res.cookie("token", token);
            res.json({
                id: adminSaved._id,
                username: adminSaved.username,
                adminId: adminSaved.adminId,
                createdAt: adminSaved.createdAt,
                updatedAt: adminSaved.updatedAt,
            });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    export const loginAdmin = async (req, res) => {
        const { adminId, password } = req.body;
        try {
            const adminFound = await Admin.findOne({ adminId });
            if (!adminFound) return res.status(400).json({ message: "Administrador no encontrado" });
    
            const isMatch = await bcrypt.compare(password, adminFound.password);
            if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
    
            const token = await createAccessToken({ id: adminFound._id });
            res.cookie("token", token);
            res.json({
                id: adminFound._id,
                username: adminFound.username,
                adminId: adminFound.adminId,
                createdAt: adminFound.createdAt,
                updatedAt: adminFound.updatedAt,
            });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    export const logoutAdmin = (req, res) => {
        res.cookie("token", "", {
            expires: new Date(0)
        });
        return res.status(200).json({ redirectTo: '/admin-login' });
    };
    
    export const adminProfile = async (req, res) => {
        const adminFound = await Admin.findById(req.user.id);
        if (!adminFound) return res.status(400).json({ message: "Administrador no encontrado" });
        
        return res.json({
            id: adminFound._id,
            username: adminFound.username,
            adminId: adminFound.adminId,
            createdAt: adminFound.createdAt,
            updatedAt: adminFound.updatedAt,
        });
    };
    
    export const getAllAdmins = async (req, res) => {
        try {
            const admins = await Admin.find({}, {
                password: 0,
                __v: 0
            });
            
            res.json(admins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };