import { v4 } from 'uuid';
import { createOrderDTO, updateOrderDTO } from './Entities/order.DTO';
import { IOrder, OrderModel } from './Entities/order.model';
import { IUser } from '../User/Entities/user.model';

export interface IOrderRepository {
    create(order: createOrderDTO, user: IUser): Promise<IOrder>;
    update(id: string, order: updateOrderDTO): Promise<IOrder | null>;
    get(): Promise<IOrder[]>;
}

class OrderRepository implements IOrderRepository {
    async create(order: createOrderDTO, user: IUser): Promise<IOrder> {
        const id = v4();

        const newOrder: IOrder = {
            ...order,
            userId: user.id,
            status: 'aguardando confirmação',
            rating: 0,
            orderDate: new Date(),
            id: id
        };

        const createdOrder = await OrderModel.create(newOrder);
        return createdOrder;
    }
    async update(id: string, order: updateOrderDTO): Promise<IOrder | null> {
        const updatedOrder = await OrderModel.findOneAndUpdate({ id }, order, { new: true });
        return updatedOrder;
    }
    async get(): Promise<IOrder[]> {
        const orders = await OrderModel.find();
        return orders;
    }
}

export default new OrderRepository();
