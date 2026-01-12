import {
	createContext,
	useContext,
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
	type ReactNode,
} from 'react';

import { client as apiClient } from '../lib/api';

import type { Client, ClientInput } from '../types/client';
import type { ApiResponse } from '../types/api';

interface ClientContextData {
	clients: Client[];

	isLoading: boolean;
	isMoreLoading: boolean;
	hasNextPage: boolean;

	loadClients: (reset?: boolean) => Promise<void>;
	createClient: (data: ClientInput) => Promise<void>;
	updateClient: (id: string, data: ClientInput) => Promise<void>;
	deleteClient: (id: string) => Promise<void>;

	search: string;
	setSearch: (value: string) => void;
	selectedCity: string | null;
	setSelectedCity: (value: string | null) => void;
	selectedDDD: string | null;
	setSelectedDDD: (value: string | null) => void;

	availableCities: string[];
	availableDDDs: string[];
}

const extractDDD = (phone: string): string => {
	const clean = phone.replace(/\D/g, '');
	return clean.substring(0, 2);
};

const ClientContext = createContext({} as ClientContextData);

export const useClients = () => {
	const context = useContext(ClientContext);
	if (!context) {
		throw new Error('useClients must be used within a ClientProvider');
	}
	return context;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
	const [allLoadedClients, setAllLoadedClients] = useState<Client[]>([]);

	const [cursor, setCursor] = useState<string | null>(null);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isMoreLoading, setIsMoreLoading] = useState(false);

	// Refs to keep values accessible in loadClients without triggering re-creation
	const cursorRef = useRef(cursor);
	const hasNextPageRef = useRef(hasNextPage);

	// Update refs when state changes
	useEffect(() => {
		cursorRef.current = cursor;
	}, [cursor]);

	useEffect(() => {
		hasNextPageRef.current = hasNextPage;
	}, [hasNextPage]);

	const [search, setSearch] = useState('');
	const [selectedCity, setSelectedCity] = useState<string | null>(null);
	const [selectedDDD, setSelectedDDD] = useState<string | null>(null);

	const loadClients = useCallback(async (reset = false) => {
		if (!reset && !hasNextPageRef.current) return;

		const currentLoadingState = reset ? setIsLoading : setIsMoreLoading;
		currentLoadingState(true);

		try {
			const params: { limit: number; cursor?: string | null } = { limit: 10 };
			if (!reset && cursorRef.current) {
				params.cursor = cursorRef.current;
			}

			const response = await apiClient<ApiResponse<Client[]>>('/clients', {
				method: 'GET',
				params,
			});

			if (response.success) {
				setAllLoadedClients((prev) =>
					reset ? response.data : [...prev, ...response.data],
				);
				setHasNextPage(response.padding.hasNextPage);
				setCursor(response.padding.nextCursor || null);
			}
		} catch (error) {
			console.error('Erro ao buscar clientes:', error);
		} finally {
			currentLoadingState(false);
		}
	}, []);

	const createClient = useCallback(
		async (data: ClientInput) => {
			setIsLoading(true);
			try {
				await apiClient('/clients', {
					method: 'POST',
					body: data,
				});

				await loadClients(true);
			} catch (error) {
				console.error('Erro ao criar cliente:', error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[loadClients],
	);

	const updateClient = useCallback(async (id: string, data: ClientInput) => {
		try {
			await apiClient(`/clients/${id}`, {
				method: 'PUT',
				body: data,
			});

			setAllLoadedClients((prev) =>
				prev.map((client) =>
					client.id === id ? { ...client, ...data } : client,
				),
			);
		} catch (error) {
			console.error('Erro ao atualizar cliente:', error);
			throw error;
		}
	}, []);

	const deleteClient = useCallback(async (id: string) => {
		try {
			await apiClient(`/clients/${id}`, {
				method: 'DELETE',
			});

			setAllLoadedClients((prev) => prev.filter((c) => c.id !== id));
		} catch (error) {
			console.error('Erro ao deletar cliente:', error);
			throw error;
		}
	}, []);

	const { availableCities, availableDDDs } = useMemo(() => {
		const cities = new Set<string>();
		const ddds = new Set<string>();

		allLoadedClients.forEach((c) => {
			if (c.city) cities.add(c.city);
			if (c.phone) ddds.add(extractDDD(c.phone));
		});

		return {
			availableCities: Array.from(cities).sort(),
			availableDDDs: Array.from(ddds).sort(),
		};
	}, [allLoadedClients]);

	const filteredClients = useMemo(() => {
		return allLoadedClients.filter((client) => {
			const matchesSearch = client.name
				.toLowerCase()
				.includes(search.toLowerCase());

			const matchesCity = selectedCity ? client.city === selectedCity : true;

			const matchesDDD = selectedDDD
				? extractDDD(client.phone) === selectedDDD
				: true;

			return matchesSearch && matchesCity && matchesDDD;
		});
	}, [allLoadedClients, search, selectedCity, selectedDDD]);

	return (
		<ClientContext.Provider
			value={{
				clients: filteredClients,
				isLoading,
				isMoreLoading,
				hasNextPage,
				loadClients,
				createClient,
				updateClient,
				deleteClient,
				search,
				setSearch,
				selectedCity,
				setSelectedCity,
				selectedDDD,
				setSelectedDDD,
				availableCities,
				availableDDDs,
			}}
		>
			{children}
		</ClientContext.Provider>
	);
};
