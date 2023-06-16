import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "john");
        }).toThrowError("customer: ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1234", "");
        }).toThrowError("customer: Name is required");
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: ID is required,customer: Name is required");
    });

    it("should change name", () => {
        // triple A (AAA)

        // Arrange
        let customer = new Customer("123", "john");
        // Act
        customer.changeName("jane")
        // Assert
        expect(customer.name).toBe("jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "C 1");
        const address = new Address("String 1", 123, "85925000", "Toledo");
        customer.Address = address;

        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "C 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when addres is undefined on activate customer", () => {
        expect(() => {
            const customer = new Customer("1", "C 1");
            customer.activate();    
        }).toThrowError("Address must be not null to activate customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "C 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});