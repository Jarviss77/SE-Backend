import express from 'express';
import {
    createOrganisation,
    getGantt,
    addMemberToOrganization,
    deleteMemberFromOrg,
    getmembers,
    getOrganisations
} from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';
import { checkCreator } from '../../middlewares/checkcreator.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);
router.route('/get/:id').get(authVerify, getGantt);
router.route('/addMember').post(authVerify, addMemberToOrganization);
router.route('/deleteMember/:id').delete(authVerify, checkCreator, deleteMemberFromOrg);
router.route('/getMembers').get(authVerify, getmembers);
router.route('/getOrganisations').get(authVerify, getOrganisations);

export default router;
