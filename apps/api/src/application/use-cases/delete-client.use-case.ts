import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

export class DeleteClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(id: string): Promise<
		| {
				success: true;
				data: {
					message: string;
				};
		  }
		| {
				success: false;
				error: {
					code: 'CLIENT_NOT_FOUND';
					message: string;
				};
		  }
	> {
		const deleted = await this.clientRepository.delete(id);

		if (!deleted) {
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
			data: {
				message: 'Client deleted successfully',
			},
		};
	}
}
