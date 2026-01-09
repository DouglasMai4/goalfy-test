import { PlusCircleIcon, SearchIcon } from 'lucide-react';

import { Button } from '../ui/Button';
import { ClientFormModal } from '../ClientFormModal';

import {
	ButtonContent,
	Container,
	DownloadIcon,
	FilterIcon,
	FilterText,
	MainActionsSection,
	RowsCounter,
	SearchWrapper,
	SecondaryActionsSection,
} from './styles';

import { Input } from '../ui/Input';

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

				<Button variant="outline">
					<FilterIcon />
					<FilterText>Filtrar</FilterText>
				</Button>
			</SecondaryActionsSection>
		</Container>
	);
}
