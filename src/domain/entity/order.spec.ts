import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("ID is required");
    });

    it("should throw error when customerID is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Customer ID is required");
    });

    it("should throw error when no items found", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("No items found");
    });

    
    it("should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const order = new Order("1", "1", [item1]);
        let total = order.total();
        expect(total).toBe(20);

        const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
        const order2 = new Order("1", "1", [item1, item2]);
        total = order2.total();
        expect(total).toBe(50);
    });

    it("should throw error if the item quantity is greater than zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 10, "p1", 0);
            const order = new Order("1", "1", [item1]);
        }).toThrowError("Quantity must be greater than zero");
    });

});