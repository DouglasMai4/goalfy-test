export const formatPhone = (value: string): string => {
	let numbers = value.replace(/\D/g, '');

	numbers = numbers.substring(0, 11);
	numbers = numbers.replace(/^(\d{2})(\d)/, '($1) $2');

	if (value.replace(/\D/g, '').length === 11) {
		numbers = numbers.replace(/(\d{5})(\d)/, '$1-$2');
	} else {
		numbers = numbers.replace(/(\d{4})(\d)/, '$1-$2');
	}

	return numbers;
};
