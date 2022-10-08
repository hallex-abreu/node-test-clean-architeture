import { Appointment } from "../../domain/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest{
    customer: string,
    startsAt: Date,
    endsAt: Date
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment{
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ){}

    async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{
        const overLappingAppointment = await this.appointmentsRepository.findOverLappinAppointment(startsAt, endsAt);

        if(overLappingAppointment)
            throw new Error('Another appointment overlapping this appointment date')

        const appointment = new Appointment({
            customer, 
            startsAt, 
            endsAt
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }   
}