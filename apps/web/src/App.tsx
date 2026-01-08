import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Header } from './components/Header';
import { TableActions } from './components/TableActions';

const theme = {
	colors: {
		primary: '#5D29A1',
		primaryForeground: '#FFFFFF',
		background: '#FFFFFF',
		foreground: '#232426',
		border: '#E8E8E8',
		input: '#F2F2F2',
		inputForeground: '#949FA6',
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
  padding: 1rem 5rem;
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<div>
				<Header />

				<MainContent>
					<TableActions />
				</MainContent>
			</div>
		</ThemeProvider>
	);
}

export default App;
