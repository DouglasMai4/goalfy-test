import { v7 as uuidv7 } from 'uuid';

export type ClientProps = {
	id?: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	zipCode: string;
	address: string;
	city: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type FindAllProps = {
	cursor?: string;
	limit?: number;
};

export class Client {
	public id: string;
	public name: string;
	public email: string;
	public phone: string;
	public document: string;
	public zipCode: string;
	public address: string;
	public city: string;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(props: ClientProps) {
		this.id = props.id ?? uuidv7();
		this.name = props.name;
		this.email = props.email;
		this.phone = props.phone;
		this.document = props.document;
		this.zipCode = props.zipCode;
		this.address = props.address;
		this.city = props.city;
		this.createdAt = props.createdAt ?? new Date();
		this.updatedAt = props.updatedAt ?? new Date();

		if (!this.name) {
			throw new Error('Name is required');
		}

		if (!this.email) {
			throw new Error('Email is required');
		}

		if (!this.phone) {
			throw new Error('Phone is required');
		}

		if (!this.document) {
			throw new Error('Document is required');
		}

		if (!this.address) {
			throw new Error('Address is required');
		}

		if (!this.city) {
			throw new Error('City is required');
		}

		if (!this.zipCode) {
			throw new Error('ZipCode is required');
		}
	}
}
