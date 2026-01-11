import { Type, AtSign, Phone, FileText, MapPin, Building2 } from 'lucide-react';
import {
	TableContainer,
	TableElement,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableCell,
	Divider,
} from './styles';
import { formatPhone } from '../../utils/phone';
import { formatCNPJ } from '../../utils/document';

interface ClientListDTO {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	address: string;
	city: string;
}

interface ClientTableProps {
	clients: ClientListDTO[];
	isLoading?: boolean;
}

export function ClientTable({ clients, isLoading }: ClientTableProps) {
	if (isLoading) {
		return <div>Carregando...</div>;
	}

	return (
		<TableContainer>
			<TableElement>
				<TableHead>
					<TableRow>
						<TableHeaderCell>
							<div>
								<Type size={16} /> Nome do Cliente
								<Divider />
							</div>
						</TableHeaderCell>
						<TableHeaderCell>
							<div>
								<AtSign size={16} /> Email
								<Divider />
							</div>
						</TableHeaderCell>
						<TableHeaderCell>
							<div>
								<Phone size={16} /> Telefone <Divider />
							</div>
						</TableHeaderCell>
						<TableHeaderCell>
							<div>
								<FileText size={16} /> CNPJ <Divider />
							</div>
						</TableHeaderCell>
						<TableHeaderCell>
							<div>
								<MapPin size={16} /> Endereço <Divider />
							</div>
						</TableHeaderCell>
						<TableHeaderCell>
							<div>
								<Building2 size={16} /> Cidade
							</div>
						</TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{clients.map((client) => (
						<TableRow key={client.id}>
							<TableCell>{client.name}</TableCell>
							<TableCell>{client.email}</TableCell>
							<TableCell>{formatPhone(client.phone)}</TableCell>
							<TableCell>{formatCNPJ(client.document)}</TableCell>
							<TableCell>{client.address}</TableCell>
							<TableCell>{client.city}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableElement>
		</TableContainer>
	);
}
