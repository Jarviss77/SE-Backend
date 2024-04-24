import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import {default as organisationRouter} from './organisation.routes.js'
import { default as getUserRouter } from './user.routes.js'
import { default as taskRouter } from './task.routes.js'
import { default as imageRouter } from './image.routes.js'
import { default as memberRouter } from './member.routes.js';

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/organisation', organisationRouter);
router.use('/user', getUserRouter);
router.use('/task', taskRouter);
router.use('/image', imageRouter);
router.use('/member', memberRouter)

export default router;
