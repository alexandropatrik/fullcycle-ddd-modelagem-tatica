import CreateProductUseCase from "./create.product.usecase";

const inputA = {
    type: "a",
    name: "mouse usb",
    price: 59.90
}

const inputB = {
    type: "b",
    name: "teclado mecanico",
    price: 119.90
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {

    it ("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        const output = await productCreateUseCase.execute(inputA);
        expect(output).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price
        });
    });

    it ("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        inputA.name = "";
        await expect(productCreateUseCase.execute(inputA)).rejects.toThrow("Name is required");
    });

    it ("should throw an error when price is equal or lower than zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        inputB.price = 0;
        await expect(productCreateUseCase.execute(inputB)).rejects.toThrow("Price must be greater than zero");
        inputB.price = -1;
        await expect(productCreateUseCase.execute(inputB)).rejects.toThrow("Price must be greater than zero");
    })

});