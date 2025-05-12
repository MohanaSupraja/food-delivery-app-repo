import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    // console.log(token)
    if (!token) {
        return res.json({ success: false, message: "Not Authorized please Login" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // req.body.userId = token_decode.id;
        req.userId = token_decode.id;
        // console.log("userid:", req.userId)
        next();
    }
    catch (e) {
        console.log(e)
        res.json({ success: false, message: "Error" })

    }
}

export default authMiddleware;