import express from 'express';
import TaskController from '../controllers/TaskController';
const router = express.Router();

// Create new task
router.post('/:id', TaskController.newTask);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

//Mark as done
router.patch('/:id/done', TaskController.markAsDone);

export default router;
