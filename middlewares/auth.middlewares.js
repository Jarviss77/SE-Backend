import jwt from 'jsonwebtoken';
import { response_500 } from '../utils/statuscodes.utils.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

function extractPayloadFromToken(decodedToken) {
    if (decodedToken && decodedToken.userID && decodedToken.FirstName && decodedToken.LastName) {
        return {
            id: decodedToken.userID,
            FirstName: decodedToken.FirstName,
            LastName: decodedToken.LastName,
            Role: decodedToken.Role
        };
    } else {
        throw new Error(
            'Invalid or missing user ID and user name in the token'
        );
    }
}

export async function authVerify(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const payload = extractPayloadFromToken(decoded);
        req.user = { ...payload };

        next();
    } catch (error) {
        return response_500(res, "Server Error", error);
    }
}