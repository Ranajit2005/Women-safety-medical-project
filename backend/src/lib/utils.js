import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //cookie cannot be accessed by client side script
        secure: process.env.OPERATION === "production", //cookie will only be sent over https connection
        sameSite: process.env.OPERATION === "production" ? "None" : "Lax", //cookie is sent in all cross-origin requests (vercel deployment)
    });

    return token;
}