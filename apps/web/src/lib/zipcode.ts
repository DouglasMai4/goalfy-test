import { ofetch } from 'ofetch';

export async function searchZipCode(zipCode: string) {
	try {
		const result = await ofetch<
			| {
					cep: string;
					logradouro: string;
					complemento: string;
					unidade: string;
					bairro: string;
					localidade: string;
					uf: string;
					estado: string;
					regiao: string;
					ibge: string;
					gia: string;
					ddd: string;
					siafi: string;
			  }
			| {
					erro: string;
			  }
		>(`https://viacep.com.br/ws/${zipCode}/json`);

		if ('erro' in result) {
			return null;
		}

		return result;
	} catch {
		return null;
	}
}
