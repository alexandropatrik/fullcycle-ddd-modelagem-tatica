import { app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    })


    it ("should create a new product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "mouse usb",
                price: 150,
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("mouse usb");
        expect(response.body.price).toBe(150);
    });

    it ("should throw an error when try to create a new product with invalid body", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "mouse",
            });
        expect(response.status).toBe(400);
    });

    it ("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "mouse usb",
                price: 150
            });
        expect(response.status).toBe(200);


        const response2 = await request(app)
            .post("/product")
            .send({
                name: "teclado usb",
                price: 300
            });
        expect(response2.status).toBe(200);
        
        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);

        expect(listResponse.body.products.length).toBe(2);

        const product = listResponse.body.products[0];
        expect(product.name).toBe("mouse usb");
        expect(product.price).toBe(150);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("teclado usb");
        expect(product2.price).toBe(300);
    });

});