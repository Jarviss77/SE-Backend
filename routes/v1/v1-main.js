import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import {default as organisationRouter} from './organisation.routes.js'
import { default as getUserRouter } from './getuser.routes.js'

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/organisation', organisationRouter);
router.use('/user', getUserRouter);

export default router;
