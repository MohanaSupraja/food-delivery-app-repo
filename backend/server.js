import express from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/oederRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())
//db connection 
connectDB();



//api endpoints


app.use("/api/food", foodRouter)
// foodRouter.use((req, res, next) => {
//     console.log("Middleware triggered");
//     next();
// });
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
    res.send("working");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})


// mongodb+srv://supraja:supraja@cluster0.evjvqxk.mongodb.net/?
// mongodb+srv://supraja:supraja@cluster0.evjvqxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// username & password:supraja