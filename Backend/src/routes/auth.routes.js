import { Router } from "express";
const router = express.Router();

router.get('/data_sensors', (req, res) => {
    data_sensorsSchema
    .find()
    .then((data) => {
        res.json(data);
    }).catch((error) => res.json({message: error}))
});

export default router;