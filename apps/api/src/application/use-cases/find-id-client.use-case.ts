import { Client } from '../../domain/entities/client.entity';
import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

export class FindIdClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(id: string): Promise<
		| {
				success: false;
				error: {
					code: 'CLIENT_NOT_FOUND';
					message: 'Client not found';
				};
		  }
		| {
				success: true;
				data: Client;
		  }
	> {
		const client = await this.clientRepository.findById(id);

		if (!client) {
			return {
				success: false,
				error: {
					code: 'CLIENT_NOT_FOUND',
					message: 'Client not found',
				},
			};
		}

		return {
			success: true,
			data: new Client(client),
		};
	}
}
