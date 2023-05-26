import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/product";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        },
        {
            where: {
                id: entity.id,
            }
        })
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id }, rejectOnEmpty: true })
        }
        catch (error) {
            throw new Error("Customer not found");
        }
        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );
        if (customerModel.active) {
            customer.activate();
        }
        customer.addRewardPoints(customerModel.rewardPoints);
        customer.Address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map( (customerModel) => {
            const c = new Customer(customerModel.id, customerModel.name);
            if (customerModel.active) {
                c.activate();
            }
            c.addRewardPoints(customerModel.rewardPoints);
            c.Address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            return c;
        }
        );
    }

}