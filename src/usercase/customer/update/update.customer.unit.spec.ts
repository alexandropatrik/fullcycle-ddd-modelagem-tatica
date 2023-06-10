import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("patrik", new Address("rua", 1, "85925000", "toledo"));

const input = {
    id: customer.id,
    name: "patrik - updated",
    address: {
        street: "rua - updated",
        number: 99,
        zip: "85925000 - updated",
        city: "toledo - updated",
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update customer use case", () => {

    it ("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });

    /*it ("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it ("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    })*/

});