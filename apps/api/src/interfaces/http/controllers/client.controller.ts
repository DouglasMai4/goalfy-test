import { z, ZodError } from 'zod';
import type { Request, Response } from 'express';

import type { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case';
import type { FindAllClientUseCase } from '../../../application/use-cases/find-all-client.use-case';
import type { FindEmailClientUseCase } from '../../../application/use-cases/find-email-client.use-case';
import { FindIdClientUseCase } from '../../../application/use-cases/find-id-client.use-case';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case';

const clientSchema = z.object({
	name: z.string().min(3),
	email: z.email(),
	phone: z.string(),
	document: z.string(),
	address: z.string(),
	city: z.string(),
});

const listSchema = z.object({
	cursor: z.string().optional(),
	limit: z.coerce.number().default(10),
});

export class ClientController {
	constructor(
		private createClientUseCase: CreateClientUseCase,
		private findAllClientUseCase: FindAllClientUseCase,
		private findEmailClientUseCase: FindEmailClientUseCase,
		private findIdClientUseCase: FindIdClientUseCase,
		private updateClientUseCase: UpdateClientUseCase,
		private deleteClientUseCase: DeleteClientUseCase,
	) {}

	async create(req: Request, res: Response) {
		try {
			const data = clientSchema.parse(req.body);

			const client = await this.createClientUseCase.execute(data);

			if ('error' in client) {
				if (client.error.code === 'EMAIL_ALREADY_EXISTS') {
					return res.status(409).json(client);
				}

				throw new Error('Unexpected error occurred');
			}

			return res.status(201).json(client);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}

	async findAll(req: Request, res: Response) {
		try {
			const { cursor, limit } = listSchema.parse(req.query);

			const clients = await this.findAllClientUseCase.execute({
				cursor,
				limit,
			});

			return res.status(200).json(clients);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}

	async findEmail(req: Request, res: Response) {
		try {
			const email = z.email().parse(req.params.email);

			const client = await this.findEmailClientUseCase.execute(email);

			if ('error' in client) {
				if (client.error.code === 'CLIENT_NOT_FOUND') {
					return res.status(404).json({
						success: false,
						error: {
							code: 'CLIENT_NOT_FOUND',
							message: 'Client not found',
						},
					});
				}

				throw new Error('Unexpected error occurred');
			}

			return res.status(200).json(client);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}

	async findId(req: Request, res: Response) {
		try {
			const id = z.uuidv7().parse(req.params.id);

			const client = await this.findIdClientUseCase.execute(id);

			if ('error' in client) {
				if (client.error.code === 'CLIENT_NOT_FOUND') {
					return res.status(404).json({
						success: false,
						error: {
							code: 'CLIENT_NOT_FOUND',
							message: 'Client not found',
						},
					});
				}

				throw new Error('Unexpected error occurred');
			}

			return res.status(200).json(client);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}

	async update(req: Request, res: Response) {
		try {
			const data = clientSchema.parse(req.body);
			const id = z.uuidv7().parse(req.params.id);

			const client = await this.updateClientUseCase.execute(id, data);

			if ('error' in client) {
				if (client.error.code === 'CLIENT_NOT_FOUND') {
					return res.status(404).json({
						success: false,
						error: {
							code: 'CLIENT_NOT_FOUND',
							message: 'Client not found',
						},
					});
				}

				if (client.error.code === 'EMAIL_ALREADY_EXISTS') {
					return res.status(409).json({
						success: false,
						error: {
							code: 'EMAIL_ALREADY_EXISTS',
							message: 'Email already exists',
						},
					});
				}

				throw new Error('Unexpected error occurred');
			}

			return res.status(200).json(client);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = z.uuidv7().parse(req.params.id);

			const deleted = await this.deleteClientUseCase.execute(id);

			if ('error' in deleted) {
				if (deleted.error.code === 'CLIENT_NOT_FOUND') {
					return res.status(404).json({
						success: false,
						error: {
							code: 'CLIENT_NOT_FOUND',
							message: 'Client not found',
						},
					});
				}

				throw new Error('Unexpected error occurred');
			}

			return res.status(200).json(deleted);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					error: {
						code: 'INVALID_REQUEST',
						message: error.issues.map((issue) => issue.message).join(', '),
					},
				});
			}

			console.error(error);
			return res.status(500).json({
				success: false,
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An internal server error occurred',
				},
			});
		}
	}
}
