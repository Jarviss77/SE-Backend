import express from 'express';
import { createTask, assignTask } from '../../controllers/task.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createTask);
router.route('/assign/:id').post(authVerify, assignTask);

export default router;
