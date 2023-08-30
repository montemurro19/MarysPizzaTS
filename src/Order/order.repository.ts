import { v4 } from 'uuid';
import { CreateOrderDTO, UpdateOrderDTO } from './order.DTO';
import { IOrder, OrderModel } from './order.model';

export class OrderRepository {
    async create(order: CreateOrderDTO, userId: string, addressId: string): Promise<IOrder> {
        const id = v4();

        //const newOrder: IOrder = { ...order, id, userId, addressId }

        return await OrderModel.create(newOrder);
    }

    async update(id: string, order: UpdateOrderDTO): Promise<IOrder | null> {
        return await OrderModel.findOneAndUpdate({ id }, order, { new: true });
    }

    async get(): Promise<IOrder[]> {
        return await OrderModel.find();
    }
}
