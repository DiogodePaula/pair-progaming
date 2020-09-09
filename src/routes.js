import { Router } from 'express';

import cors from 'cors';

import UserController from './app/controllers/UserController';
import TesteController from './app/controllers/TesteController';
import NoteController from './app/controllers/NoteController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'BOMBANDO' }));

routes.post('/login', AuthController.store);

routes.post('/users', UserController.store);

routes.put('/users/:uid', UserController.update);
routes.delete('/users/:uid', UserController.delete);

routes.post('/testes', TesteController.store);

routes.put('/testes/:uid', TesteController.update);
routes.delete('/testes/:uid', TesteController.delete);

routes.post('/notes', NoteController.store);

routes.put('/notes/:uid', NoteController.update);
routes.delete('/notes/:uid', NoteController.delete);

routes.use(authMiddleware);

// Users (auth)
routes.get('/users', UserController.index);
routes.get('/users/:uid', UserController.show);
// Testes (auth)
routes.get('/testes', TesteController.index);
routes.get('/testes/:uid', TesteController.show);
// Notes (auth)
routes.get('/notes', NoteController.index);
routes.get('/notes/:uid', NoteController.show);
export default routes;
