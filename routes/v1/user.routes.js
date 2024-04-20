import express from 'express';


import { getUser, getUsers, updateUser } from '../../controllers/user.controllers.js';
import { authVerify } from '../../middlewares/auth.middlewares.js';


const router = express.Router();

router.route('/getuser').get(authVerify, getUser);
router.route('/getusers').get(authVerify, getUsers);
router.route('/updateuser').patch(authVerify, updateUser);


export default router;
