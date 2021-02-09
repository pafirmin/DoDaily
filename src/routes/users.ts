import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// Create new user
router.post('/', UserController.newUser);

export default router;
