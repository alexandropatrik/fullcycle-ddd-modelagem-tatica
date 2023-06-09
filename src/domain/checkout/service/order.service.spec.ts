import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
        const item3 = new OrderItem("2", "Item 2", 20, "p2", 2);

        const order = OrderService.placeOrder(customer, [item1, item2, item3]);

        expect(customer.rewardPoints).toBe(45);
        expect(order.total()).toBe(90);

    });

    it("should calculate the price of all orders", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const order1 = new Order("1", "1", [item1]); // 20

        const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
        const order2 = new Order("1", "1", [item1, item2]); // 50

        const item3 = new OrderItem("2", "Item 2", 20, "p2", 2);
        const order3 = new Order("1", "1", [item1, item2, item3]); // 90

        const total = OrderService.total([order1, order2, order3])
        expect(total).toBe(160);
    });
    
});