import { Schema, model } from 'mongoose';
import { IUser } from '../models/interface/User';

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['homem', 'mulher', 'outro']
    },
    userType: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
});

export const UserModel = model<IUser>('User', userSchema);
