import express from 'express';

import { default as userAuthRouter } from './auth.routes.js'
import {default as organisationRouter} from './organisation.routes.js'
import { default as getUserRouter } from './user.routes.js'
import { default as testRouter } from './testing.routes.js'
import { default as taskRouter } from './task.routes.js'
import { default as imageRouter } from './image.routes.js'

const router = express.Router();

router.use('/auth', userAuthRouter);
router.use('/organisation', organisationRouter);
router.use('/user', getUserRouter);
router.use('/task', taskRouter);
router.use('/image', imageRouter);
router.use('/test', testRouter);

export default router;
// {
//     "status": "Inserted",
//     "message": "Organisation Created",
//     "data": {
//         "id": "662075d67419b225c25721c9",
//         "Name": "testing org",
//         "CreatedById": "6620752c7419b225c25721c7"
//     }
// }
