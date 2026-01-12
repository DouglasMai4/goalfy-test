import { PlusCircleIcon, SearchIcon } from 'lucide-react';

import { Button } from '../ui/Button';
import { ClientFormModal } from '../ClientFormModal';

import {
	ButtonContent,
	Container,
	DownloadIcon,
	DropdownContent,
	DropdownSection,
	FilterButton,
	FilterIcon,
	FilterText,
	Label,
	MainActionsSection,
	RowsCounter,
	SearchWrapper,
	SecondaryActionsSection,
} from './styles';

import { Input } from '../ui/Input';
import { Dropdown } from '../ui/Dropdown';
import { Select } from '../ui/Select';
import { useClients } from '../../contexts/client-context';
import { DownloadButton } from '../DowloadButton';

export function TableActions() {
	const {
		clients,
		availableCities,
		availableDDDs,
		createClient,
		selectedCity,
		setSelectedCity,
		selectedDDD,
		setSelectedDDD,
		search,
		setSearch,
	} = useClients();

	const handleCreateClient = async (data: {
		name: string;
		email: string;
		phone: string;
		document: string;
		zipCode: string;
		city: string;
		address: string;
	}) => {
		try {
			await createClient(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<MainActionsSection>
				<ClientFormModal
					trigger={
						<Button>
							<PlusCircleIcon />
							<ButtonContent>Novo registro</ButtonContent>
						</Button>
					}
					onSubmit={handleCreateClient}
				/>

				<SearchWrapper>
					{/* TODO: Put a CNPJ input search too */}
					<Input
						icon={SearchIcon}
						placeholder="Pesquisar..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</SearchWrapper>

				<RowsCounter>{clients.length} Registros</RowsCounter>
			</MainActionsSection>

			<SecondaryActionsSection>
				<DownloadButton />

				<Dropdown.Root>
					<Dropdown.Trigger>
						<Button variant="outline">
							<FilterIcon />
							<FilterText>Filtrar</FilterText>
						</Button>
					</Dropdown.Trigger>
					<Dropdown.Content>
						<DropdownContent>
							<DropdownSection>
								<Label>Cidade</Label>

								<Select.Root
									value={selectedCity || undefined}
									onValueChange={setSelectedCity}
								>
									<Select.Trigger>
										<Select.Value placeholder="Selecione..." />
									</Select.Trigger>
									<Select.Content>
										{availableCities.map((city) => (
											<Select.Item key={city} value={city}>
												{city}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
							</DropdownSection>

							<DropdownSection>
								<Label>DDD</Label>

								<Select.Root
									value={selectedDDD || undefined}
									onValueChange={setSelectedDDD}
								>
									<Select.Trigger>
										<Select.Value placeholder="Selecione..." />
									</Select.Trigger>
									<Select.Content>
										{availableDDDs.map((ddd) => (
											<Select.Item key={ddd} value={ddd}>
												{ddd}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
							</DropdownSection>

							<FilterButton
								variant="ghost"
								onClick={() => {
									setSelectedCity(null);
									setSelectedDDD(null);
								}}
							>
								Limpar
							</FilterButton>
						</DropdownContent>
					</Dropdown.Content>
				</Dropdown.Root>
			</SecondaryActionsSection>
		</Container>
	);
}
