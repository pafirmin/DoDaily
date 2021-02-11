import express from 'express';
import TaskController from '../controllers/TaskController';
const router = express.Router();

// Create new task
router.post('/:folderId', TaskController.newTask);

// Get all user's tasks
router.get('/', TaskController.getAll);

// Mark as done
router.patch('/:id/done', TaskController.markAsDone);

// Change priotity
router.patch('/:id/priority', TaskController.changePriority);

// Add note
router.put('/:id/addnote', TaskController.addNote);

// Delete note
router.delete('/:taskID/note/:noteID', TaskController.deleteNote);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

export default router;
