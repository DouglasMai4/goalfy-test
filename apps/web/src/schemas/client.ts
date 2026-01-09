import { z } from 'zod';

export const clientSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z.email('Email inválido'),
	phone: z.string().min(1, 'Telefone é obrigatório'),
	document: z.string().min(1, 'CNPJ é obrigatório'),
	zipCode: z.string().min(5, 'CEP inválido'),
	city: z.string().min(2, 'Cidade inválida'),
	address: z.string().min(1, 'Endereço é obrigatório'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
