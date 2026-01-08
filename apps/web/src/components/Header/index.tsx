import {
	Divider,
	HeaderSection,
	MembersCount,
	MembersSection,
	PageTitle,
	PageTitleSection,
	ShareIcon,
	StyledHeader,
	StyledHeaderTitle,
	UserIcon,
	UserPicture,
} from './styles';

export function Header() {
	return (
		<StyledHeader>
			<HeaderSection>
				<StyledHeaderTitle>Goalfy</StyledHeaderTitle>

				<Divider />

				<PageTitleSection>
					<ShareIcon />

					<PageTitle>Registro de Clientes</PageTitle>
				</PageTitleSection>
			</HeaderSection>

			<HeaderSection>
				<MembersSection>
					<UserIcon />

					<MembersCount>Membros(20)</MembersCount>
				</MembersSection>

				<Divider />

				<UserPicture
					src="https://github.com/DouglasMai4.png"
					alt="User Picture"
				/>
			</HeaderSection>
		</StyledHeader>
	);
}
