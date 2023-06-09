import EventHandlerInterface from "../../../_shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../../../customer/event/customer-address-changed.event";

export default class EnviaConsoleLogWhenAddressChangeHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }

}