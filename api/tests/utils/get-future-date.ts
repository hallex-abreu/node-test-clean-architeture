import { setYear, parseISO } from 'date-fns';

/**
 * Receives "2022-10-12" and return "2023-10-12"
*/

export function getFutureDate(date: string): Date{
    return setYear(parseISO(date), new Date().getFullYear() + 1);
}