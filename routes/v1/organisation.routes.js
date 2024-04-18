import express from 'express';
import { createOrganisation, getOrganisation, addMemberToOrganization, deleteMemberFromOrg } from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';
import { checkCreator } from '../../middlewares/checkcreator.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);
router.route('/get/:id').get(authVerify, getOrganisation);
router.route('/addMember').post(authVerify, addMemberToOrganization);
router.route('/deleteMember').post(authVerify, deleteMemberFromOrg);

export default router;