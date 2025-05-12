import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = userData.cartData || {};

        const itemId = req.body.itemId;
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (e) {
        console.error(e);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = userData.cartData || {};

        const itemId = req.body.itemId;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (e) {
        console.error(e);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ success: false, message: "User not identified" });
        }

        const userData = await userModel.findById(req.userId);
        const cartData = userData.cartData;
        console.log(cartData)
        res.json({ success: true, cartData });
    } catch (e) {
        console.error(e);
        res.json({ success: false, message: "Error retrieving cart" });
    }
};
const clearCart = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ success: false, message: "User not identified" });
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (e) {
        console.error(e);
        res.json({ success: false, message: "Error clearing cart" });
    }
};
export { addToCart, removeFromCart, getCart, clearCart };
