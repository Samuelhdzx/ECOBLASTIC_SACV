import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";

export const validateToken = (req, res, next) => {
    // Buscar en el header Authorization
    let token = null;
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    // Si no está en el header, buscar en cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
    }
    if (!token) return res.status(401).json({ message: "Sin Autorizacion" });
    
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Sin Autorizacion" });

        req.user = user;
        
        next();
    });
}