import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("product: ID is required");
    });

    it("should throw error when name empty", () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrowError("product: Name is required");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            let product = new Product("", "", 100);
        }).toThrowError("product: ID is required,product: Name is required");
    });

    it("should throw error when price is zero", () => {
        expect(() => {
            let product = new Product("123", "Product 1", 0);
        }).toThrowError("product: Price must be greater than zero");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("123", "Product 1", -1);
        }).toThrowError("product: Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 50);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 50);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});