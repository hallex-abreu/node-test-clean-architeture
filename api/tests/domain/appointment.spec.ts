import { expect, test } from 'vitest';
import { getFutureDate } from '../utils/get-future-date';
import { Appointment } from '../../domain/appointment';

test('create an appointment', () => { 
    const startsAt = getFutureDate('2022-10-07');
    const endsAt = getFutureDate('2022-10-08');
    
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt 
    });

    expect(appointment).toBeInstanceOf(Appointment); 
    expect(appointment.customer).toEqual('John Doe');
});

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2022-10-07');
    const endsAt = getFutureDate('2022-10-06');
    
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt 
        });
    }).throw('Invalid end date');
}); 

test('cannot create an appointment with start date after end date', () => {
    const startsAt = getFutureDate('2022-10-08');
    const endsAt = getFutureDate('2022-10-07');
    
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt 
        });
    }).throw('Invalid end date');
}); 