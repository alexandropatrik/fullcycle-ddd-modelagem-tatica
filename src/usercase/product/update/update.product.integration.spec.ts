import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const inputCreateProductDto1 = {
            name: "Produto 1",
            price: 10
        };
        const result = await createProductUseCase.execute(inputCreateProductDto1);

        
        const input = {
            id: result.id,
            name: "teclado usb",
            price: 350
        }
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const output = await productUpdateUseCase.execute(input);

        expect(output.id).toBe(input.id);
        expect(output.name).toBe(input.name);
        expect(output.price).toBe(input.price);
    });

})