import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Header } from './components/Header';
import { TableActions } from './components/TableActions';
import { ClientTable } from './components/ClientTable';
import { useClients } from './contexts/client-context';
import { useEffect } from 'react';

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
	const { loadClients } = useClients();

	useEffect(() => {
		loadClients(true);
	}, [loadClients]);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<div>
				<Header />

				<MainContent>
					<TableActions />

					<ClientTable />
				</MainContent>
			</div>
		</ThemeProvider>
	);
}

export default App;
