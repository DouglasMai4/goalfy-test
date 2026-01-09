export const formatCNPJ = (value: string): string => {
	const numbers = value.replace(/\D/g, '');

	const truncated = numbers.substring(0, 14);

	return truncated
		.replace(/^(\d{2})(\d)/, '$1.$2')
		.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
		.replace(/\.(\d{3})(\d)/, '.$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2');
};
