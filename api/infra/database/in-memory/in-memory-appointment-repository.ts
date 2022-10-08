import { areIntervalsOverlapping } from 'date-fns';

import { Appointment } from "../../../domain/appointment";
import { AppointmentsRepository } from "../../../application/repositories/appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentsRepository{
    public items: Appointment[] = [];
    
    async findOverLappinAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overLappingAppointment = this.items.find(appointment => {
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt},
                { start: appointment.startsAt, end: appointment.endsAt},
                { inclusive: true }
            )
        });
        
        if(!overLappingAppointment)
            return null;

        return overLappingAppointment;
    }
    
    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }
}