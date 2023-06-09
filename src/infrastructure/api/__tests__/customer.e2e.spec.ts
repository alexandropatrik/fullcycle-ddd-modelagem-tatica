import { app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    })


    it ("should create a new customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "patrik",
                address: {
                    street: "rua",
                    number: 1,
                    city: "Toledo",
                    zip: "85925000"
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("patrik");
        expect(response.body.address.street).toBe("rua");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.city).toBe("Toledo");
        expect(response.body.address.zip).toBe("85925000");
    });

    it ("should not create a new customer (with eror)", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "patrik",
            });
        expect(response.status).toBe(400);
    });

    it ("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "patrik",
                address: {
                    street: "rua",
                    number: 1,
                    city: "Toledo",
                    zip: "85925000"
                }
            });
        expect(response.status).toBe(200);


        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "alexandro",
                address: {
                    street: "avenida",
                    number: 2,
                    city: "cascavel",
                    zip: "95000111"
                }
            });
        expect(response2.status).toBe(200);
        
        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);

        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("patrik");
        expect(customer.address.street).toBe("rua");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("alexandro");
        expect(customer2.address.street).toBe("avenida");

        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);

        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>patrik</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>rua</street>`);
        expect(listResponseXML.text).toContain(`<number>1</number>`);
        expect(listResponseXML.text).toContain(`<zip>85925000</zip>`);
        expect(listResponseXML.text).toContain(`<city>Toledo</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`<name>alexandro</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>avenida</street>`);
        expect(listResponseXML.text).toContain(`<number>2</number>`);
        expect(listResponseXML.text).toContain(`<zip>95000111</zip>`);
        expect(listResponseXML.text).toContain(`<city>cascavel</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`</customers>`);
    });

});