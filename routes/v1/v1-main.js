import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import {default as organisationRouter} from './organisation.routes.js'
import { default as userRouter } from './user.routes.js'

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/organisation', organisationRouter);
router.use('/user', userRouter);

export default router;
