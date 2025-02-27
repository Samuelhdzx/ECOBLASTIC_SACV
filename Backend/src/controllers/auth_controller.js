    // ============================================
    // Import Dependencies
    // ============================================
    import User from "../models/user_model.js";
    import Admin from "../models/admin.js";
    import bcrypt from "bcryptjs";
    import { createAccessToken } from "../libs/jwt.js";

    // ============================================
    // User Authentication Controllers
    // ============================================

    /**
     * Register a new user
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    export const register = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new User({
                username,
                email,
                password: passwordHash
            });

            // Save user and generate token
            const userSaved = await newUser.save();
            const token = await createAccessToken({ id: userSaved._id });
            
            // Set cookie and send response
            res.cookie("token", token);
            res.json({
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

    /**
     * User login
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    export const login = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Find user
            const userFound = await User.findOne({ email });
            if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

            // Verify password
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

            // Generate token and set cookie
            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
            
            res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

        /**
     * User logout with dashboard redirect
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    export const logout = (req, res) => {
        res.cookie("token", "", { 
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({ redirectTo: '/inicio' });
    };

    /**
     * Get user profile
     */
    export const profile = async (req, res) => {
        const userFound = await User.findById(req.user.id);
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    };

    /**
     * Get all users (excluding sensitive data)
     */
    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.find({}, {
                password: 0,  // Exclude password
                __v: 0       // Exclude version key
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // ============================================
    // Admin Authentication Controllers
    // ============================================

    /**
     * Create new admin
     */
    export const createAdmin = async (req, res) => {
        const { username, adminId, password } = req.body;
        try {
            // Check for existing admin
            const adminExists = await Admin.findOne({ adminId });
            if (adminExists) {
                return res.status(400).json({ message: "Admin ID already exists" });
            }

            // Create new admin
            const passwordHash = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                username,
                adminId,
                password: passwordHash
            });

            // Save and generate token
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

    /**
     * Admin login
     */
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

    /**
     * Admin logout
     */
    export const logoutAdmin = (req, res) => {
        res.cookie("token", "", { expires: new Date(0) });
        return res.status(200).json({ redirectTo: '/admin-login' });
    };

    /**
     * Get admin profile
     */
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

    /**
     * Get all admins (excluding sensitive data)
     */
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
    export const deleteUser = async (req, res) => {
        try {
            const { userId } = req.params;
            console.log(`Intentando eliminar usuario con ID: ${userId}`);
    
            const userDeleted = await User.findByIdAndDelete(userId);
            
            if (!userDeleted) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ message: error.message });
        }
    };
    