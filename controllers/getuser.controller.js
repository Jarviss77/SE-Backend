const User = require('../models/user.model');

import { verify } from 'jsonwebtoken';
import { extractPayloadFromToken, verifyToken } from '../middlewares/auth.middlewares.js';

export async function getUserId (req, res) {
    try {
        const token = verifyToken();
        const payload = extractPayloadFromToken(decodeToken);
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User Not Found.' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};