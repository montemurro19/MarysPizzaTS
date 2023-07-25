import { Request, Response } from 'express';
import orderService from './order.service';

class OrderController {
    async createOrder(req: Request, res: Response) {
        const order = req.body;
        const user = req.user;
        try {
            const newOrder = await orderService.createOrder(order, user);
            res.status(201).json(newOrder);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o pedido' });
        }
    }
    async updateOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = req.body;
        const user = req.user;
        try {
            const updatedOrder = await orderService.updateOrder(id, order, user);
            if (updatedOrder) {
                res.status(200).json(updatedOrder);
            } else {
                res.status(404).json({ erro: 'pedido não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o pedido' });
        }
    }
    async getOrderById(req: Request, res: Response) {
        const id = req.params.id;
        const user = req.user;
        try {
            const order = await orderService.getOrderById(id, user);
            res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o pedido' });
        }
    }
    async getAllOrders(req: Request, res: Response) {
        const user = req.user;
        try {
            const orders = await orderService.getAllOrder(user);
            res.status(200).json(orders);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o pedido' });
        }
    }
}

export default new OrderController();
