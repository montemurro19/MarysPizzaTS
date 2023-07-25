import { Request, Response } from 'express';
import orderService from './order.service';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const newOrder = await orderService.createOrder(req.body, req.user);
            res.status(201).json(newOrder);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o pedido' });
        }
    }
    async updateOrder(req: Request, res: Response) {
        try {
            const updatedOrder = await orderService.updateOrder(req.params.id, req.body, req.user);
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
        try {
            const order = await orderService.getOrderById(req.params.id, req.user);
            res.status(200).json(order);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o pedido' });
        }
    }
    async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await orderService.getAllOrder(req.user);
            res.status(200).json(orders);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o pedido' });
        }
    }
}

export default new OrderController();
