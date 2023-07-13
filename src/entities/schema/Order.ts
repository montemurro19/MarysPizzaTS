import { Schema } from 'mongoose';
import { IOrder } from '../models/interface/Order';

const orderSchema = new Schema<IOrder>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            amount: {
                type: Number,
                required: true
            },
            itemId: {
                type: String,
                required: true
            }
        }
    ],
    addressId: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['aguardando confirmação', 'em preparação', 'aguardando cancelamento', 'saiu pra entrega', 'concluido', 'cancelado', 'avaliado', 'pedido alterado'],
        default: 'aguardando confirmação'
    },
    paymentMethod: {
        type: String,
        required: [true, 'please add a payment method'],
        enum: ['cartão de crédito', 'cartão de débito', 'dinheiro']
    },
    rating: {
        type: Number,
        required: false,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    orderDate: {
        type: Date,
        required: true
    }
});

export default orderSchema;
