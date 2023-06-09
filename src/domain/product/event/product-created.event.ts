import EventInterface from "../../_shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = new Date;
        this.eventData = eventData;
    }
}