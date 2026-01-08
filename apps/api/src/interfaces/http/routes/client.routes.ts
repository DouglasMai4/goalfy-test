import { Router } from 'express';
import { makeClientController } from '../factories/make-client-controller';

export const clientRoutes = Router();

const clientController = makeClientController();

clientRoutes.post('/', clientController.create.bind(clientController));
clientRoutes.get('/', clientController.findAll.bind(clientController));
clientRoutes.get('/:id', clientController.findId.bind(clientController));
clientRoutes.get(
	'/email/:email',
	clientController.findEmail.bind(clientController),
);
clientRoutes.put('/:id', clientController.update.bind(clientController));
clientRoutes.delete('/:id', clientController.delete.bind(clientController));
