import express from 'express';
import FolderController from '../controllers/FolderController';

const router = express.Router();

// Get user folders
router.get('/', FolderController.getFolders);

// Get folder tasks
router.get('/:id/tasks', FolderController.getTasks);

// Make new folder
router.post('/', FolderController.newFolder);

// Delete folder
router.delete('/:id', FolderController.deleteFolder);

// Rename folder
router.patch('/:id', FolderController.renameFolder);

export default router;
