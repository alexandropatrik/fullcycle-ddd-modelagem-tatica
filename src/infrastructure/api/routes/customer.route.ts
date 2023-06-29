import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usercase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usercase/customer/list/list.customer.usecase';
import CustomerPresenter from '../presenters/customer.presenter';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip,
            },
        };

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (error) {
        res.status(400).send(error);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute({});
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(CustomerPresenter.toXML(output)),
        })
    } catch (error) {
        res.status(500).send(error);
    }
});