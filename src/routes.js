import { Router } from 'express';

import cors from 'cors';

import UserController from './app/controllers/UserController';
import TesteController from './app/controllers/TesteController';
// import AuthController from './app/controllers/AuthController';

// import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'BOMBANDO' }));

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:uid', UserController.show);
routes.put('/users/:uid', UserController.update);
routes.delete('/users/:uid', UserController.delete);

// routes.post('/login', AuthController.store);

// // routes.use(authMiddleware);

// ROUTES PARA TESTES
routes.post('/testes', TesteController.store);
routes.get('/testes', TesteController.index);
routes.get('/testes/:uid', TesteController.show);
routes.put('/testes/:uid', TesteController.update);
routes.delete('/testes/:uid', TesteController.delete);

export default routes;
