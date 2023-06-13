import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1234", "mouse usb", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find product use case", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1234",
        }

        const output = {
            id: "1234",
            name: "mouse usb",
            price: 10
        }

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual(output);
    });

    it ("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1234",
        }

        expect(() => {
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");

    });

})