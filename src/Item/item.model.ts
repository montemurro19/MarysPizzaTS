import { Model, Schema, model } from 'mongoose';

export interface IItem {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
}

const itemSchema = new Schema<IItem>(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

export const ItemModel: Model<IItem> = model<IItem>('Item', itemSchema);
