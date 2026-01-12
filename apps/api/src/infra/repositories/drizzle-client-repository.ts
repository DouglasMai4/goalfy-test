import { eq, asc, gt } from 'drizzle-orm';

import { db } from '../../infra/database/connection';
import { clientsTable } from '../../infra/database/schema';

import type { Client, FindAllProps } from '../../domain/entities/client.entity';
import type { IClientRepository } from '../../domain/repositories/client-repository.interface';

export class DrizzleClientRepository implements IClientRepository {
	async save(client: Client): Promise<Client | null> {
		const [created] = await db
			.insert(clientsTable)
			.values({
				name: client.name,
				email: client.email,
				phone: client.phone,
				document: client.document,
				zipCode: client.zipCode,
				address: client.address,
				city: client.city,
			})
			.returning();

		return created;
	}

	async findAll({ cursor, limit = 10 }: FindAllProps): Promise<Client[]> {
		return await db
			.select()
			.from(clientsTable)
			.where(cursor ? gt(clientsTable.id, cursor) : undefined)
			.orderBy(asc(clientsTable.id))
			.limit(limit + 1);
	}

	async findByEmail(email: string): Promise<Client | null> {
		const [row] = await db
			.select()
			.from(clientsTable)
			.where(eq(clientsTable.email, email));

		return row;
	}

	async findById(id: string): Promise<Client | null> {
		const [row] = await db
			.select()
			.from(clientsTable)
			.where(eq(clientsTable.id, id));

		return row;
	}

	async update(
		id: string,
		client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Client | null> {
		const [updated] = await db
			.update(clientsTable)
			.set(client)
			.where(eq(clientsTable.id, id))
			.returning();

		return updated;
	}

	async delete(id: string): Promise<Client | null> {
		const [deleted] = await db
			.delete(clientsTable)
			.where(eq(clientsTable.id, id))
			.returning();

		return deleted;
	}
}
