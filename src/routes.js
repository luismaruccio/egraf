import { Router } from 'express';

//Controller
import UserController from './app/controller/UserController';

const routes = new Router();

routes.post('/users', UserController.insert);
routes.get('/users', UserController.getAll)
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);


export default routes;