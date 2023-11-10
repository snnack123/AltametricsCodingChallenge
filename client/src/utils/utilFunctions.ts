/**
 * Merges classes into a single string
 */
export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

/**
 * Returns formatted date in format like this: ```DD/MM/YYYY```
 * @param date
 * @returns
 */
export const returnShortFormattedDate = (date: string): string => {
	if (!date) return '';
	const newDate = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
	};
	const formattedDate = newDate.toLocaleDateString('en-GB', options);
	const [day, month, year] = formattedDate.split('/');
	return `${day}/${month}/${year}`;
};