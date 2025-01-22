import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        // Asegura el formato ECO-ADM-XXX
        match: /^ECO-ADM-\d{3}$/
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Admin', adminSchema);
