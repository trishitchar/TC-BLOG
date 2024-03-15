import User from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { username: req.body.username, name: req.body.name, password: hashedPassword };

        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({
            message: "Signup successful"
        });
    } catch (e) {
        console.error("Error in signupUser:", e);
        return res.status(400).json({
            message: "Signup not successful"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "Username doesn't match" });
        }

        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '900s' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return res.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });
        } else {
            return res.status(400).json({ message: 'Password does not match' });
        }
    } catch (e) {
        console.error("Error in loginUser:", e);
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
};
