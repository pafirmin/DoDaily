import AuthController from '../controllers/AuthController';
import router from './users';

router.post('/', AuthController.logIn);

export default router;
