import EventInterface from "../_shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = new Date;
        this.eventData = eventData;
    }
}