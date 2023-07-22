import { Model, Schema, model } from 'mongoose';

export interface IAddress {
    id: string;
    userId: string;
    title: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    landmark: string;
}

const addressSchema = new Schema<IAddress>(
    {
        id: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        title: { type: String, required: true, unique: true },
        cep: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        landmark: { type: String, required: true }
    },
    { timestamps: true }
);

export const AddressModel: Model<IAddress> = model<IAddress>('Address', addressSchema);
