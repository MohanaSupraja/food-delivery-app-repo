import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();
//Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});



const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("After Multer:", req.body, req.file);
    next();
}, addFood);

foodRouter.get("/list", listFood)

foodRouter.post('/remove', removeFood)
export default foodRouter;