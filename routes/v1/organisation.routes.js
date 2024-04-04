import express from 'express';
import { createOrganisation } from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);

export default router;