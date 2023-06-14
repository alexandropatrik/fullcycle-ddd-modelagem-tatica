import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1234", "Patrik");
const address = new Address("r 01", 1, "85925000", "toledo");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "1234",
        }

        const output = {
            id: "1234",
            name: "Patrik",
            address: {
                street: "r 01",
                number: 1,
                zip: "85925000",
                city: "toledo"
            }
        }

        const result = await findCustomerUseCase.execute(input);

        expect(result).toEqual(output);

    });

    it ("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "1234",
        }

        expect(() => {
            return findCustomerUseCase.execute(input);
        }).rejects.toThrow("Customer not found");

    });

})