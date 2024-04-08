import express from 'express';

import { getUser } from '../../controllers/getuser.controller.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/getuser').get(authVerify, getUser);

export default router;