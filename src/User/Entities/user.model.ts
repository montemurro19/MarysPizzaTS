import { Model, Schema, model } from 'mongoose';

export interface IUser {
    id: string;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    password: string;
    birthdate: Date;
    gender: string;
    userType: string;
    token: string;
}

const userSchema = new Schema<IUser>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        cpf: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        telephone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        birthdate: { type: Date, required: true },
        gender: { type: String, required: true },
        userType: { type: String, required: true },
        token: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

export const UserModel: Model<IUser> = model<IUser>('User', userSchema);
