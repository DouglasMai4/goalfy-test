import { Client } from '../../domain/entities/client.entity';
import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

interface CreateClientInput {
	name: string;
	email: string;
	phone: string;
	document: string;
	address: string;
	city: string;
}

export class CreateClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(input: CreateClientInput): Promise<
		| {
				success: true;
				data: Client;
		  }
		| {
				success: false;
				error: {
					code: 'EMAIL_ALREADY_EXISTS';
					message: string;
				};
		  }
	> {
		const clientExists = await this.clientRepository.findByEmail(input.email);

		if (clientExists) {
			return {
				success: false,
				error: {
					code: 'EMAIL_ALREADY_EXISTS',
					message: 'Client with this email already exists.',
				},
			};
		}

		const client = new Client(input);
		await this.clientRepository.save(client);

		return {
			success: true,
			data: client,
		};
	}
}
