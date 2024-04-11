import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import {default as organisationRouter} from './organisation.routes.js'
import { default as getUserRouter } from './getuser.routes.js'
import { default as testingRouter } from './testing.routes.js'
import { default as taskRouter } from './task.routes.js'

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/organisation', organisationRouter);
router.use('/user', getUserRouter);
router.use('/test', testingRouter); // can be use further for testing purpose so mat hatana
router.use('/task', taskRouter);

export default router;
