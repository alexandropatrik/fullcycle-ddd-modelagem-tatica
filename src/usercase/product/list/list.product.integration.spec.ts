import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {

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


    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const inputCreateProductDto1 = {
            name: "Produto 1",
            price: 10
        };
        const inputCreateProductDto2 = {
            name: "Produto 1",
            price: 10
        };

        const result1 = await createProductUseCase.execute(inputCreateProductDto1);
        const result2 = await createProductUseCase.execute(inputCreateProductDto2);

        
        const productListUseCase = new ListProductUseCase(productRepository);
        
        const output = await productListUseCase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toBeDefined;
        expect(output.products[0].name).toBe(result1.name);
        expect(output.products[0].price).toBe(result1.price);

        expect(output.products[1].id).toBeDefined();
        expect(output.products[1].name).toBe(result2.name);
        expect(output.products[1].price).toBe(result2.price);
        
    });

})