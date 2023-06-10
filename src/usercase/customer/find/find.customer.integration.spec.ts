import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find a customer", async () => {
        const customer = new Customer("1234", "Patrik");
        const address = new Address("r 01", 1, "85925000", "toledo");
        customer.changeAddress(address);
        
        const customerRepository = new CustomerRepository();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

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

})