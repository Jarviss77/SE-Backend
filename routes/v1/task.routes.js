import express from 'express';
import { createTask, assignTask, getUnassignedTasks , taskCompleted} from '../../controllers/task.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';
import { isAssigner } from '../../middlewares/isAssigner.middlewares.js';

const router = express.Router();

router.route('/create').post(authVerify, isAssigner, createTask);
router.route('/assign/:id').patch(authVerify, assignTask);
router.route('/getUnassignedTasks/:id').get(authVerify, getUnassignedTasks);
router.route('/taskCompleted/:id').patch(authVerify, taskCompleted);

export default router;
