import express from 'express';

import { addMemberToOrganization } from '../../controllers/addMember.controllers.js';

const router = express.Router();

router.route('/addMembertoOrg').post(addMemberToOrganization);

export default router;