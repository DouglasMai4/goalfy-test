import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Header } from './components/Header';
import { TableActions } from './components/TableActions';
import { ClientTable } from './components/ClientTable';

const theme = {
	colors: {
		primary: '#5D29A1',
		primaryForeground: '#FFFFFF',
		background: '#FFFFFF',
		foreground: '#232426',
		border: '#E8E8E8',
		input: '#F2F2F2',
		inputForeground: '#949FA6',
		modalHeader: '#E4E5E7',
	},
	sizes: {
		mobile: '768px',
	},
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.foreground}	;
    font-family: 'Red Hat Text', sans-serif;
  }

  ::selection {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 5rem;

  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    padding: 1rem;
  }
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<div>
				<Header />

				<MainContent>
					<TableActions />

					<ClientTable
						isLoading={false}
						clients={[
							{
								id: '1',
								name: 'John Doe',
								email: 'john.doe@example.com',
								phone: '123-456-7890',
								address: '123 Main St',
								city: 'New York',
								document: '12345678901234',
							},
							{
								id: '2',
								name: 'Jane Doe',
								email: 'jane.doe@example.com',
								phone: '987-654-3210',
								address: '456 Elm St',
								city: 'Los Angeles',
								document: '98765432109876',
							},
							{
								id: '3',
								name: 'Bob Smith',
								email: 'bob.smith@example.com',
								phone: '555-555-5555',
								address: '789 Oak St',
								city: 'Chicago',
								document: '12345678901234',
							},
						]}
					/>
				</MainContent>
			</div>
		</ThemeProvider>
	);
}

export default App;
