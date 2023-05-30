import EventHandlerInterface from "../../_shared/event-handler.interface";
import EventInterface from "../../_shared/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending e-mail to  ${event.eventData}`);
    }

}