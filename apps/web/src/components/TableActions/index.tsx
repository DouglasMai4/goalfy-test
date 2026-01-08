import { PlusCircleIcon, SearchIcon } from 'lucide-react';

import { Button } from '../ui/Button';

import {
	ButtonContent,
	Container,
	ContainerSection,
	DownloadIcon,
	FilterIcon,
	FilterText,
	RowsCounter,
} from './styles';
import { Input } from '../ui/Input';

export function TableActions() {
	return (
		<Container>
			<ContainerSection>
				<Button>
					<PlusCircleIcon />
					<ButtonContent>Novo registro</ButtonContent>
				</Button>

				<Input icon={SearchIcon} placeholder="Pesquisar..." />

				<RowsCounter>86 Registros</RowsCounter>
			</ContainerSection>

			<ContainerSection>
				<Button variant="ghost">
					<DownloadIcon />
				</Button>

				<Button variant="outline">
					<FilterIcon />
					<FilterText>Filtrar</FilterText>
				</Button>
			</ContainerSection>
		</Container>
	);
}
