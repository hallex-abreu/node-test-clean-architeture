import { expect, test } from 'vitest';
import { getFutureDate } from './get-future-date';
test('increases date with one year', () => { 
    const year = new Date().getFullYear();
    const yearMoreOne = new Date().getFullYear() + 1;

    expect(getFutureDate(`${year}-10-07`).getFullYear()).toEqual(yearMoreOne)
});