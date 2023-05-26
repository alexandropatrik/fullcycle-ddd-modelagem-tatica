import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([OrderModel, CustomerModel, ProductModel, OrderItemModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create new order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1", product.name, product.price, product.id, 2
        );

        const order = new Order("111", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: "items"
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                }
            ]
        })
    });

    it("should find an order by id", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1", product.name, product.price, product.id, 2
        );

        const order = new Order("111", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderFound = await orderRepository.find(order.id);
        expect(orderFound).toEqual(order);
    });

    it("should find all orders", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1", product.name, product.price, product.id, 2
        );

        const product2 = new Product("2", "P2", 40);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem(
            "2", product2.name, product2.price, product2.id, 5
        );

        const orderRepository = new OrderRepository();

        const order = new Order("111", customer.id, [orderItem]);
        await orderRepository.create(order);

        const order2 = new Order("112", customer.id, [orderItem2]);
        await orderRepository.create(order2);
        
        const ordersFound = await orderRepository.findAll();
        const orders = [order, order2];

        expect(orders).toEqual(ordersFound);
    });

    it("should update an order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "C1");
        customer.Address = new Address("RUA", 0, "85925000", "TOLEDO");
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1", product.name, product.price, product.id, 2
        );

        let order = new Order("111", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        let orderModel = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: "items"
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                }
            ]
        })

        const product2 = new Product("2", "P2", 51);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2", product2.name, product2.price, product2.id, 7
        );

        order.addItem(orderItem2);
        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: "items"
        });

        const obj = {
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.productId,
                    order_id: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,
                },
                {
                    id: orderItem2.id,
                    product_id: orderItem2.productId,
                    order_id: order.id,
                    quantity: orderItem2.quantity,
                    name: orderItem2.name,
                    price: orderItem2.price,
                },   
            ]
        };

        expect(orderModel2.toJSON()).toStrictEqual(obj);
    });

});