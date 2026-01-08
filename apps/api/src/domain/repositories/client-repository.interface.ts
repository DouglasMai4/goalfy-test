import type { Client, FindAllProps } from '../entities/client.entity';

export interface IClientRepository {
	// Create
	save(client: Client): Promise<Client | null>;

	// Read
	findAll(props?: FindAllProps): Promise<Client[]>;
	findByEmail(email: string): Promise<Client | null>;
	findById(id: string): Promise<Client | null>;

	// Update
	update(
		id: string,
		client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Client | null>;

	// Delete
	delete(id: string): Promise<Client | null>;
}
