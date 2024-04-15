import express from 'express';
import { createOrganisation, getOrganisation, addMemberToOrganization } from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);
router.route('/get/:id').get(authVerify, getOrganisation);
router.route('/addMember').post(authVerify, addMemberToOrganization);

export default router;