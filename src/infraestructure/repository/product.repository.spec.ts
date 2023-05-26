import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {

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

    it("should create new product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne( { where: { id: "1" } } );

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "P1",
            price: 100,
        })
    });

    it("should create update product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne( { where: { id: "1" } } );

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "P1",
            price: 100,
        })

        product.changeName("P2");
        product.changePrice(200);
        
        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne( { where: { id: "1" } } );

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "P2",
            price: 200,
        })

    });

    it("should find one product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne( { where: { id: "1" } } );

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        })

    });

    it("should create find all products", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 100);
        await productRepository.create(product);

        const product2 = new Product("2", "P2", 200);
        await productRepository.create(product2);

        const product3 = new Product("3", "P3", 300);
        await productRepository.create(product3);


        const foundProducts = await productRepository.findAll();
        const products = [product, product2, product3];

        expect(products).toEqual(foundProducts);

    });

});