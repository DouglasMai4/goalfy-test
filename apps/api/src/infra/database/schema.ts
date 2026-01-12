import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuidv7 } from 'uuid';

export const clientsTable = sqliteTable('clients', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: text('name').notNull(),
	email: text('email').notNull(),
	phone: text('phone').notNull(),
	document: text('cnpj').notNull(),
	zipCode: text('zip_code').notNull(),
	address: text('address').notNull(),
	city: text('city').notNull(),
	createdAt: int('created_at', { mode: 'timestamp_ms' }).default(
		sql`(unixepoch() * 1000)`,
	),
	updatedAt: int('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
		.$onUpdate(() => new Date()),
});
