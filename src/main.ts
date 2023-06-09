import Address from "./domain/customer/value-object/address";
import Order from "./domain/checkout/entity/order";
import Customer from "./domain/customer/entity/customer";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer("123", "patrik");
const address = new Address("R 1", 2, "85925-000", "Toledo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 1);

const order = new Order("1", customer.id, [item1, item2]);
