import express from 'express';
import {
    createOrganisation,
    getGantt,
    addMemberToOrganization,
    deleteMemberFromOrg,
    getmembers,
    getOrganisations, getAssigners
} from '../../controllers/organisation.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';
import { checkCreator } from '../../middlewares/checkcreator.middlewares.js';
import { isAssigner } from '../../middlewares/isAssigner.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createOrganisation);
router.route('/get/:id').get(authVerify, getGantt);
router.route('/addMember').post(authVerify, isAssigner, addMemberToOrganization);
router.route('/deleteMember/:id').delete(authVerify, checkCreator, deleteMemberFromOrg);
router.route('/getMembers/:id').get(authVerify, getmembers);
router.route('/getOrganisations').get(authVerify, getOrganisations);
router.route('/getAssigners/:id').get(authVerify, getAssigners);

export default router;
