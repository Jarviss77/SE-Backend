import express from 'express';
import {
    getmember,
} from '../../controllers/member.controllers.js';

const router = express.Router();

router.route('/getmember/:id').get(getmember);

export default router;

