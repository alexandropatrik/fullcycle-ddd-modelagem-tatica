import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("patrik", new Address("r 01", 1, "85925000", "toledo"));
const customer2 = CustomerFactory.createWithAddress("alexandro", new Address("r 02", 2, "85000222", "cascavel"));


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit test list customer use case", () => {

    it ("should list all customers", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);
        
        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toEqual(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);

    });

});