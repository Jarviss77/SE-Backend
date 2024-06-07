import express from 'express';
const router = express.Router();

import { verifyMail } from '../../controllers/emailverify.controllers.js';

router.route('/verifyMail').post(verifyMail);

export default router;