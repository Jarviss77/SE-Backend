import express from 'express';
import {
    register,
    login,
} from '../../controllers/auth.controllers.js';
import { verifymail } from '../../controllers/emailverify.controllers.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verifymail').post(verifymail);

export default router;
