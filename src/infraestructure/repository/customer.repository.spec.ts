import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";

describe("Customer repository test", () => {

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

    it("should create new customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne( { where: { id: "1" } } );

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        })
    });

    it("should throw an error when customer is not found", async() => {
        const customerRepository = new CustomerRepository();
        expect(async() => {
            await customerRepository.find("4599xxx");
        }).rejects.toThrow("Customer not found");
    })

    it("should update customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");

        await customerRepository.create(customer);

        customer.changeName("C2");
        
        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne( { where: { id: "1" } } );

        expect(customerModel2.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        })

    });
    
});