import express from 'express';

import { verifyToken } from '../middlewares/auth.middlewares.js';
import { getUserId } from '../../controllers/getuser.controller';

const router = express.router;

router.route('/getuserbyid').get(verifyToken, getUserId);

export default router;