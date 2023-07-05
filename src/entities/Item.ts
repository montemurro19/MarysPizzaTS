import { Schema, model } from 'mongoose';
import { IItem } from './models/Item';

const itemSchema = new Schema<IItem>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['pizza salgada', 'pizza doce', 'bebida']
    }
});

export const ItemModel = model<IItem>('Item', itemSchema);
