import express from 'express';

import { imageupload } from '../../controllers/image.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/imageupload').post(authVerify, imageupload);

export default router;
