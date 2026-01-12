import { useEffect, useState } from 'react';

import {
	BoltIcon,
	Building2Icon,
	MapPinIcon,
	FileTextIcon,
	PhoneIcon,
	AtSignIcon,
	TypeIcon,
	EllipsisVerticalIcon,
	Trash2Icon,
	UserRoundPenIcon,
} from 'lucide-react';

import {
	TableContainer,
	TableElement,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableCell,
	Divider,
	CelCenter,
	LoadMoreContainer,
} from './styles';

import { formatPhone } from '../../utils/phone';
import { formatCNPJ } from '../../utils/document';

import { useClients } from '../../contexts/client-context';

import { Dropdown } from '../ui/Dropdown';
import { Button } from '../ui/Button';

import { ClientFormModal } from '../ClientFormModal';
import { Skeleton } from '../Skeleton';

import type { Client } from '../../types/client';

export function ClientTable() {
	const {
		clients,
		isLoading,
		isMoreLoading,
		hasNextPage,
		loadClients,
		deleteClient,
		updateClient,
	} = useClients();
	const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);

	useEffect(() => {
		loadClients(true);
	}, [loadClients]);

	return (
		<div>
			<TableContainer>
				<TableElement>
					<TableHead>
						<TableRow>
							<TableHeaderCell>
								<div>
									<TypeIcon size={16} /> Nome do Cliente
									<Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<AtSignIcon size={16} /> Email
									<Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<PhoneIcon size={16} /> Telefone <Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<FileTextIcon size={16} /> CNPJ <Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<MapPinIcon size={16} /> Endereço <Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<Building2Icon size={16} /> Cidade <Divider />
								</div>
							</TableHeaderCell>
							<TableHeaderCell>
								<div>
									<BoltIcon size={16} /> Ações
								</div>
							</TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{isLoading
							? Array.from({ length: 10 }).map((_, index) => (
									<TableRow key={index}>
										<TableCell>
											<Skeleton width="100%" />
										</TableCell>
										<TableCell>
											<Skeleton width="80%" />
										</TableCell>
										<TableCell>
											<Skeleton width="100%" />
										</TableCell>
										<TableCell>
											<Skeleton width="100%" />
										</TableCell>
										<TableCell>
											<Skeleton width="60%" />
										</TableCell>
										<TableCell>
											<Skeleton width="100%" />
										</TableCell>
										<TableCell>
											<CelCenter>
												<Skeleton width={20} height={20} />
											</CelCenter>
										</TableCell>
									</TableRow>
								))
							: clients.map((client) => (
									<TableRow key={client.id}>
										<TableCell>{client.name}</TableCell>
										<TableCell>{client.email}</TableCell>
										<TableCell>{formatPhone(client.phone)}</TableCell>
										<TableCell>{formatCNPJ(client.document)}</TableCell>
										<TableCell>{client.address}</TableCell>
										<TableCell>{client.city}</TableCell>
										<TableCell>
											<CelCenter>
												<Dropdown.Root>
													<Dropdown.Trigger>
														<Button variant="ghost">
															<EllipsisVerticalIcon size={16} />
														</Button>
													</Dropdown.Trigger>
													<Dropdown.Content>
														<Dropdown.Item
															onClick={() => setClientToUpdate(client)}
														>
															<UserRoundPenIcon size={16} />
															Atualizar
														</Dropdown.Item>

														<Dropdown.Separator />

														<Dropdown.Item
															danger
															onClick={() => deleteClient(client.id)}
														>
															<Trash2Icon size={16} />
															Deletar
														</Dropdown.Item>
													</Dropdown.Content>
												</Dropdown.Root>
											</CelCenter>
										</TableCell>
									</TableRow>
								))}
						{!isLoading && clients.length === 0 && (
							<TableRow>
								<TableCell colSpan={7}>
									<CelCenter>Nenhum cliente encontrado.</CelCenter>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</TableElement>

				{!isLoading && hasNextPage && clients.length > 0 && (
					<LoadMoreContainer>
						<Button
							type="button"
							onClick={() => loadClients()}
							disabled={isMoreLoading}
							aria-label="Carregar mais clientes"
						>
							{isMoreLoading ? 'Carregando...' : 'Carregar mais'}
						</Button>
					</LoadMoreContainer>
				)}
			</TableContainer>

			{clientToUpdate && (
				<ClientFormModal
					trigger={<></>}
					defaultValues={clientToUpdate}
					submitLabel="Atualizar Cliente"
					onOpenChange={(isOpen) => !isOpen && setClientToUpdate(null)}
					onSubmit={(data) => {
						updateClient(clientToUpdate.id, data);
						setClientToUpdate(null);
					}}
				/>
			)}
		</div>
	);
}
