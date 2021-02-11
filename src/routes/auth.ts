import AuthController from '../controllers/AuthController';
import express from 'express';
const router = express.Router();

router.post('/', AuthController.logIn);

export default router;
