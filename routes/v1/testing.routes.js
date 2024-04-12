import express from 'express';

const router = express.Router();
// this router is for testing purpose only will be deleted after completion of project
router.get('/testing', (req, res) => {
    res.json({"check":'Backend is working'});
});

export default router;