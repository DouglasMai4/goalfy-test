export const formatZipCode = (value: string): string => {
	const numbers = value.replace(/\D/g, '');

	const truncated = numbers.substring(0, 8);

	return truncated.replace(/^(\d{5})(\d)/, '$1-$2');
};
