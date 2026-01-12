import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { ClientProvider } from './contexts/client-context.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ClientProvider>
			<App />
		</ClientProvider>
	</StrictMode>,
);
