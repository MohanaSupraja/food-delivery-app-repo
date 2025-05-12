import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://supraja:supraja@cluster0.evjvqxk.mongodb.net/food-del').then(() => console.log("DB connection Success"));

}