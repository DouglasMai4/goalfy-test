import { useEffect, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { clientSchema, type ClientFormData } from '../../schemas/client';

import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import {
	AddressContainer,
	Form,
	InputContainer,
	Label,
	NewText,
	SubmitButton,
	ErrorMessage,
} from './styles';

import {
	AtSignIcon,
	IdCard,
	MapPinHouseIcon,
	MapPinIcon,
	MapPinnedIcon,
	PhoneIcon,
	TextCursorIcon,
} from 'lucide-react';

import { formatCNPJ } from '../../utils/document';
import { formatPhone } from '../../utils/phone';
import { formatZipCode } from '../../utils/zipcode';
import { searchZipCode } from '../../lib/zipcode';

export interface ClientFormModalProps {
	trigger: ReactNode;
	defaultValues?: Partial<ClientFormData>;
	onSubmit?: (data: ClientFormData) => Promise<void> | void;
	submitLabel?: string;
	title?: string;
	onOpenChange?: (isOpen: boolean) => void;
}

export function ClientFormModal({
	trigger,
	defaultValues,
	onSubmit,
	submitLabel = 'Novo Registro',
	title = ' ',
	onOpenChange,
}: ClientFormModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ClientFormData>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			document: '',
			zipCode: '',
			city: '',
			address: '',
			...defaultValues,
		},
	});

	const zipCode = watch('zipCode');
	const address = watch('address');

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	useEffect(() => {
		if (zipCode?.replace(/\D/g, '').length !== 8 || address) return;

		async function fetchAddress() {
			try {
				const addressData = await searchZipCode(zipCode);

				if (addressData) {
					setValue('city', addressData.localidade);
					setValue(
						'address',
						`${addressData.logradouro} S/N, ${addressData.bairro}`,
					);
				}
			} catch (error) {
				console.error(error);
			}
		}

		fetchAddress();
	}, [zipCode, setValue, address]);

	const handleFormSubmit = async (data: ClientFormData) => {
		await onSubmit?.(data);
	};

	return (
		<Modal.Root
			onOpenChange={(isOpen) => {
				reset();
				onOpenChange?.(isOpen);
			}}
			defaultOpen={!!defaultValues}
		>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>
			<Modal.Portal>
				<Modal.Overlay />

				<Modal.Content title={title}>
					<Form onSubmit={handleSubmit(handleFormSubmit)}>
						<InputContainer>
							<Label htmlFor="client-name">Nome do cliente</Label>

							<Input
								id="client-name"
								icon={TextCursorIcon}
								placeholder="Digite aqui..."
								{...register('name')}
								autoFocus
								autoCapitalize="words"
							/>
							{errors.name && (
								<ErrorMessage>{errors.name.message}</ErrorMessage>
							)}
						</InputContainer>

						<InputContainer>
							<Label htmlFor="client-email">Email</Label>

							<Input
								id="client-email"
								icon={AtSignIcon}
								placeholder="Digite aqui..."
								{...register('email')}
								type="text"
							/>
							{errors.email && (
								<ErrorMessage>{errors.email.message}</ErrorMessage>
							)}
						</InputContainer>

						<InputContainer>
							<Label htmlFor="client-phone">Telefone</Label>

							<Input
								id="client-phone"
								icon={PhoneIcon}
								placeholder="Digite aqui..."
								{...register('phone', {
									onChange: (e) => {
										e.target.value = formatPhone(e.target.value);
									},
								})}
								type="tel"
							/>
							{errors.phone && (
								<ErrorMessage>{errors.phone.message}</ErrorMessage>
							)}
						</InputContainer>

						<InputContainer>
							<Label htmlFor="client-document">CNPJ</Label>

							<Input
								id="client-document"
								icon={IdCard}
								placeholder="Digite aqui..."
								{...register('document', {
									onChange: (e) => {
										e.target.value = formatCNPJ(e.target.value);
									},
								})}
								type="tel"
							/>
							{errors.document && (
								<ErrorMessage>{errors.document.message}</ErrorMessage>
							)}
						</InputContainer>

						<AddressContainer>
							<InputContainer>
								<Label htmlFor="client-zipcode">CEP</Label>

								<Input
									id="client-zipcode"
									icon={MapPinIcon}
									placeholder="Digite aqui..."
									{...register('zipCode', {
										onChange: (e) => {
											e.target.value = formatZipCode(e.target.value);
										},
									})}
									type="tel"
								/>
								{errors.zipCode && (
									<ErrorMessage>{errors.zipCode.message}</ErrorMessage>
								)}
							</InputContainer>

							<InputContainer>
								<Label htmlFor="client-city">Cidade</Label>

								<Input
									id="client-city"
									icon={MapPinHouseIcon}
									placeholder="Digite aqui..."
									{...register('city')}
								/>
								{errors.city && (
									<ErrorMessage>{errors.city.message}</ErrorMessage>
								)}
							</InputContainer>

							<InputContainer className="full">
								<Label htmlFor="client-address">Endereço</Label>

								<Input
									id="client-address"
									icon={MapPinnedIcon}
									placeholder="Digite aqui..."
									{...register('address')}
								/>
								{errors.address && (
									<ErrorMessage>{errors.address.message}</ErrorMessage>
								)}
							</InputContainer>
						</AddressContainer>

						<Modal.Actions>
							<SubmitButton type="submit" disabled={isSubmitting}>
								<NewText>{submitLabel}</NewText>
							</SubmitButton>
						</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal.Portal>
		</Modal.Root>
	);
}
