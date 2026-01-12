import { db } from './connection';
import { clientsTable } from './schema';
import { seed } from 'drizzle-seed';

async function main() {
	console.log('Starting seed...');

	await seed(db, { clientsTable }).refine((funcs) => ({
		clientsTable: {
			count: 100,
			columns: {
				name: funcs.companyName(),

				email: funcs.email(),

				phone: funcs.phoneNumber({
					template: '##########',
				}),

				document: funcs.int({
					minValue: 10000000000000,
					maxValue: 99999999999999,
					isUnique: true,
				}),

				zipCode: funcs.int({
					minValue: 10000000,
					maxValue: 99999999,
					isUnique: false,
				}),

				address: funcs.streetAddress(),
				city: funcs.city(),

				createdAt: funcs.date({ minDate: '2023-01-01', maxDate: '2026-01-12' }),
			},
		},
	}));

	console.log('Seed completed!');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
