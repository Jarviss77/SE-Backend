import express from 'express';
import { createTask, assignTask, getUnassignedTasks } from '../../controllers/task.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, createTask);
router.route('/assign/:id').post(authVerify, assignTask);
router.route('/getUnassignedTasks/:id').get(authVerify, getUnassignedTasks);

export default router;
