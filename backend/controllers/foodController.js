import { log } from "console";
import foodModel from "../models/foodModel.js";
import userModel from '../models/userModel.js'
import fs from 'fs';

const addFood = async (req, res) => {
    // console.log("Uploaded file:", req.file);

    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error saving food" });
    }
};

//all food-list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    }
    catch (e) {
        console.log(e)
        res.json({ success: false, message: "Error" })
    }
}
const removeFood = async (req, res) => {
    try {
        const foodId = req.body.id;

        // Step 1: Find and delete the food item
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }


        // Step 2: Remove item from all user carts
        const users = await userModel.find({});

        for (const user of users) {
            if (user.cartData && user.cartData[foodId]) {
                console.log(user.cartData[foodId])
                delete user.cartData[foodId];
                await userModel.findByIdAndUpdate(user._id, { cartData: user.cartData });
                console.log("updated")
            }
        }
        // Delete image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error("Image deletion error:", err);
        });

        // Delete food from foodModel
        await foodModel.findByIdAndDelete(foodId);


        res.json({ success: true, message: "Food removed and carts updated" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { addFood, listFood, removeFood }