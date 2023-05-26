import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    
    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
              where: { order_id: entity.id },
              transaction: t,
            });
            const items = entity.items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
              order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
              { total: entity.total() },
              { where: { id: entity.id }, transaction: t }
            );
          });
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id: id }, include: [ "items" ] });
        
        const order = new Order(orderModel.id, orderModel.customer_id, 
            orderModel.items.map((orderItemModel) => 
            new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.product_id, orderItemModel.quantity) 
        ));
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });
        return orderModels.map( (orderModel) => 
            new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((orderItemModel) => 
                new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.product_id, orderItemModel.quantity) 
            ))
        );
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
        {   
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                product_id: item.productId,
                order_id: entity.id,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
            })),
        }, 
        {
            include: [ 
                {
                    model: OrderItemModel,
                    required: true
                }
             ]
        });
    }


}