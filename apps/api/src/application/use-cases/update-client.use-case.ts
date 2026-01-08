import type { Client } from '../../domain/entities/client.entity';
import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

interface UpdateClientInput {
	name: string;
	email: string;
	phone: string;
	document: string;
	address: string;
	city: string;
}

export class UpdateClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(
		id: string,
		input: UpdateClientInput,
	): Promise<
		| {
				success: true;
				data: Client;
		  }
		| {
				success: false;
				error: {
					code: 'CLIENT_NOT_FOUND' | 'EMAIL_ALREADY_EXISTS';
					message: string;
				};
		  }
	> {
		const exists = await this.clientRepository.findByEmail(input.email);

		if (exists && exists.id !== id) {
			return {
				success: false,
				error: {
					code: 'EMAIL_ALREADY_EXISTS',
					message: 'Email already exists.',
				},
			};
		}

		const updated = await this.clientRepository.update(id, input);

		if (!updated) {
			return {
				success: false,
				error: {
					code: 'CLIENT_NOT_FOUND',
					message: 'Client not found.',
				},
			};
		}

		return {
			success: true,
			data: updated,
		};
	}
}
