import { describe, expect, it } from "vitest";
import { Appointment } from "../../../domain/appointment";
import { CreateAppointment } from "../../../application/use-cases/create-appointment";
import { InMemoryAppointmentRepository } from "../../../infra/database/in-memory/in-memory-appointment-repository";
import { getFutureDate } from "../../utils/get-future-date";

describe('Create appointment', () => {
    it('Should be able to create an appointment', () => {
        const startsAt = getFutureDate('2022-10-07');
        const endsAt = getFutureDate('2022-10-08');

        const appointmentsRepository = new InMemoryAppointmentRepository();
        const sut = new CreateAppointment(appointmentsRepository);
        //system under test

        expect(sut.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment) 
    });

    it('Should not be able to create an appointment with overlapping dates', async () => {
        const startsAt = getFutureDate('2022-10-07');
        const endsAt = getFutureDate('2022-10-15');

        const appointmentsRepository = new InMemoryAppointmentRepository();
        const sut = new CreateAppointment(appointmentsRepository);
        //system under test

        await sut.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-10-08'),
            endsAt: getFutureDate('2022-10-18')
        })).rejects.toBeInstanceOf(Error) 
    });
});