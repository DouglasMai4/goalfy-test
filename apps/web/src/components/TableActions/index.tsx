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

export function TableActions() {
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
					onSubmit={(data) => console.log(data)}
				/>

				<SearchWrapper>
					<Input icon={SearchIcon} placeholder="Pesquisar..." />
				</SearchWrapper>

				<RowsCounter>86 Registros</RowsCounter>
			</MainActionsSection>

			<SecondaryActionsSection>
				<Button variant="ghost">
					<DownloadIcon />
				</Button>

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

								<Select.Root>
									<Select.Trigger>
										<Select.Value placeholder="Selecione..." />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="joinville">Joinville</Select.Item>
									</Select.Content>
								</Select.Root>
							</DropdownSection>

							<DropdownSection>
								<Label>DDD</Label>

								<Select.Root>
									<Select.Trigger>
										<Select.Value placeholder="Selecione..." />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="47">47</Select.Item>
									</Select.Content>
								</Select.Root>
							</DropdownSection>

							<FilterButton>Filtrar</FilterButton>
						</DropdownContent>
					</Dropdown.Content>
				</Dropdown.Root>
			</SecondaryActionsSection>
		</Container>
	);
}
