export interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	address: string;
	city: string;
	createdAt: Date;
}

export interface ClientInput {
	name: string;
	email: string;
	phone: string;
	document: string;
	address: string;
	city: string;
}
