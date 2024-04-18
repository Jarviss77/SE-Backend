import express from 'express';

import { getimage, imageupload } from '../../controllers/image.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/imageupload').post(authVerify, imageupload);
router.route('/getimage').get(authVerify, getimage);

export default router;
