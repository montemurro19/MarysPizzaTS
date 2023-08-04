import { IUser } from '../User/Entities/user.model';
import { createOrderDTO, updateOrderDTO } from './Entities/order.DTO';
import { IOrder } from './Entities/order.model';
import orderRepository from './order.repository';

class OrderService {
    private memoryCache: IOrder[] | null = null;
    private async cache(): Promise<IOrder[]> {
        this.memoryCache !== null ? this.memoryCache : (this.memoryCache = await orderRepository.get());
        return this.memoryCache;
    }

    async createOrder(order: createOrderDTO, user: IUser): Promise<IOrder> {
        const newOrder = await orderRepository.create(order, user);
        return newOrder;
    }

    async updateOrder(id: string, newOrder: updateOrderDTO, user: IUser): Promise<IOrder | null> {
        const orders = await this.cache();
        const order = orders.find((data) => data.id === id);

        if (!order) {
            throw new Error('order not found');
        }

        const updatedOrder = await orderRepository.update(id, newOrder);
        return updatedOrder;
    }

    async getAllOrder(user: IUser): Promise<IOrder[]> {
        const orders = this.cache();
        return orders;
    }

    async getOrderById(id: string): Promise<IOrder | undefined> {
        const orders = this.cache();
        const order = (await orders).find((data) => data.id === id);
        return order;
    }
}

export default new OrderService();
