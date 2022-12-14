export interface IAppointment{
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: IAppointment;

    get customer(){
        return this.props.customer;
    }

    get startsAt(){
        return this.props.startsAt;
    }

    get endsAt(){
        return this.props.endsAt;
    }

    constructor(props: IAppointment){
        const { startsAt, endsAt } = props;

        if(startsAt <= new Date())
            throw new Error('Invalid end date');

        if(endsAt <= startsAt)
            throw new Error('Invalid end date'); 

        this.props = props;
    }
}