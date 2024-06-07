import { default as mailRouter } from './mail.routes.js';

import express from 'express';
const router = express.Router();

router.use('/mail', mailRouter);

export default router;