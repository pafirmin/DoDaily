import express from 'express';
import TaskController from '../controllers/TaskController';
const router = express.Router();

// Create new task
router.post('/:folderId', TaskController.newTask);

// Get all user's tasks
router.get('/', TaskController.getAll);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

// Mark as done
router.patch('/:id/done', TaskController.markAsDone);

// Add note
router.put('/:id/addnote', TaskController.addNote);

export default router;
