import express from 'express';
import { createOrganisation, getOrganisation } from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);
router.route('/get/:id').get(authVerify, getOrganisation);

export default router;