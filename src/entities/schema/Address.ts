import { Schema, model } from 'mongoose';
import { IAddress } from '../models/interface/Address';

const addressSchema = new Schema<IAddress>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    }
});

export const AddressModel = model<IAddress>('Address', addressSchema);
