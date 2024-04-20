import express from 'express';
import { createTask } from '../../controllers/task.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';
import { isAssigner } from '../../middlewares/isAssigner.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, isAssigner, createTask);

export default router;
