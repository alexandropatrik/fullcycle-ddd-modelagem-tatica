import EventDispatcher from "../_shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogWhenAddressChangeHandler from "./handler/envia-console-log-when-address-change.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe ("Domain events tests", () => {

    it("should notify when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler);

        const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle");
        const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle");

        const customerCreatedPayload = new CustomerCreatedEvent({
            id: 1,
            nome: "nome"
        });
        // executes the handle method
        eventDispatcher.notify(customerCreatedPayload);

        expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
        expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
    });

    it("should notify when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const addressChangeHandler = new EnviaConsoleLogWhenAddressChangeHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", addressChangeHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(addressChangeHandler);

        const spyEnviaConsoleLog1Handler = jest.spyOn(addressChangeHandler, "handle");

        const customerCreatedPayload = new CustomerAddressChangedEvent({
            id: 1,
            nome: "ALEXANDRO PATRIK PERGHER",
            endereco: "R RUI BARBOSA, 119 - CENTRO - TOLEDO PR"
        });
        // executes the handle method
        eventDispatcher.notify(customerCreatedPayload);

        expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    });

});