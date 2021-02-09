import express from 'express';
import FolderController from '../controllers/FolderController';

const router = express.Router();

router.post('/', FolderController.newFolder);

export default router;
