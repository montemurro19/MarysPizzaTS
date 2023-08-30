import { Model, Schema, model } from 'mongoose';

export interface IOrder {
    id: string;
    userId: string;
    addressId: string;
    items: {
        amount: number;
        itemId: string;
    }[];
    notes?: string;
    status: string;
    paymentMethod: string;
    rating: number;
    orderDate: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        id: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        addressId: { type: String, required: true },
        items: [
            {
                amount: { type: Number, required: true },
                itemId: { type: String, required: true }
            }
        ],
        notes: { type: String },
        status: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        rating: { type: Number, required: true },
        orderDate: { type: Date, required: true }
    },
    { timestamps: true }
);

export const OrderModel: Model<IOrder> = model<IOrder>('Order', orderSchema);
