import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";

describe("Test find product use case", () => {

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


    it("should find a product", async () => {
        const product = new Product("1234", "mouse usb", 188);
        
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            id: "1234",
        }

        const output = {
            id: "1234",
            name: "mouse usb",
            price: 188
        }

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual(output);

    });

})