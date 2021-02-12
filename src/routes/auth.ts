import AuthController from '../controllers/AuthController';
import express from 'express';
const router = express.Router();

router.post('/', AuthController.logIn);

router.post('/refreshtoken', AuthController.refreshToken);

router.post('/logout', AuthController.logout);

export default router;
