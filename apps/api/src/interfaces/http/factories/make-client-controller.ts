import { DrizzleClientRepository } from '../../../infra/repositories/drizzle-client-repository';
import { ClientController } from '../controllers/client.controller';

import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case';
import { FindAllClientUseCase } from '../../../application/use-cases/find-all-client.use-case';
import { FindEmailClientUseCase } from '../../../application/use-cases/find-email-client.use-case';
import { FindIdClientUseCase } from '../../../application/use-cases/find-id-client.use-case';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case';

export function makeClientController(): ClientController {
	const repository = new DrizzleClientRepository();

	const createUseCase = new CreateClientUseCase(repository);
	const findAllUseCase = new FindAllClientUseCase(repository);
	const findEmailUseCase = new FindEmailClientUseCase(repository);
	const findIdUseCase = new FindIdClientUseCase(repository);
	const updateUseCase = new UpdateClientUseCase(repository);
	const deleteUseCase = new DeleteClientUseCase(repository);

	const controller = new ClientController(
		createUseCase,
		findAllUseCase,
		findEmailUseCase,
		findIdUseCase,
		updateUseCase,
		deleteUseCase,
	);

	return controller;
}
