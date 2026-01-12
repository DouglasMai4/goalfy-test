import { useClients } from '../../contexts/client-context';
import { DownloadBtn, DownloadIcon } from './styles';

const headers = [
	{
		key: 'id',
		label: 'ID',
	},
	{
		key: 'name',
		label: 'Nome',
	},
	{
		key: 'email',
		label: 'Email',
	},
	{
		key: 'phone',
		label: 'Telefone',
	},
	{
		key: 'document',
		label: 'CNPJ',
	},
	{
		key: 'zipCode',
		label: 'CEP',
	},
	{
		key: 'address',
		label: 'Endereço',
	},
	{
		key: 'city',
		label: 'Cidade',
	},
	{
		key: 'createdAt',
		label: 'Data criação',
	},
	{
		key: 'updatedAt',
		label: 'Ultima atualização',
	},
];

export function DownloadButton() {
	const { clients } = useClients();

	return (
		<DownloadBtn
			data={clients}
			headers={headers}
			filename={`clients-${new Date().toISOString().slice(0, 10)}.csv`}
		>
			<DownloadIcon />
		</DownloadBtn>
	);
}
