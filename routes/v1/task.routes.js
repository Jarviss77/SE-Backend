import express from 'express';
import { createTask } from '../../controllers/task.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createTask);

export default router;
