import { Appointment } from "../../domain/appointment";

export interface AppointmentsRepository{
    create(appointment: Appointment): Promise<void>;
    findOverLappinAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}