import { Client, type FindAllProps } from '../../domain/entities/client.entity';
import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

export class FindAllClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(props?: FindAllProps): Promise<{
		success: true;
		data: Client[];
		padding: {
			hasNextPage: boolean;
			nextCursor: string | null;
		};
	}> {
		const results = await this.clientRepository.findAll(props);

		const hasNextPage = results.length > props.limit;
		const clients = hasNextPage ? results.slice(0, -1) : results;
		const nextCursor = hasNextPage ? clients[clients.length - 1].id : null;

		return {
			success: true,
			data: clients.map((client) => new Client(client)),
			padding: {
				hasNextPage,
				nextCursor,
			},
		};
	}
}
