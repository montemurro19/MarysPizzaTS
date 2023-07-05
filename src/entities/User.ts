import { Schema, model } from 'mongoose';
import { IUser } from './models/User';

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    cpf: {
        type: String,
        required: [true, 'Please add a cpf'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    telephone: {
        type: String,
        required: [true, 'Please add a telephone'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    birthdate: {
        type: Date,
        required: [true, 'Please add a birthdate']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: ['homem', 'mulher', 'outro']
    },
    userType: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

export const UserModel = model<IUser>('User', userSchema);
