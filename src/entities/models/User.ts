import { v4 } from 'uuid';
import config from '../../config/config';
const jwt = require('jsonwebtoken');

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

export class createUser implements IUser {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public telephone: string;
    public password: string;
    public birthdate: Date;
    public gender: string;
    public userType: string;
    public readonly token: string;

    constructor(props: any) {
        this.name = props.name;
        this.cpf = props.cpf;
        this.email = props.email;
        this.telephone = props.telephone;
        this.password = props.password;
        this.birthdate = props.birthdate;
        this.gender = props.gender;
        this.userType = 'user';
        this.id = v4();
        this.token = jwt.sign({ id: this.id }, config.jwt.secret, { expiresIn: '30d' });
    }
}

export class updateUser implements IUser {
    public id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public telephone: string;
    public password: string;
    public birthdate: Date;
    public gender: string;
    public userType: string;
    public token: string;

    constructor(props: any, userOriginal: IUser) {
        this.id = userOriginal.id;
        this.name = !!props.name ? props.name : userOriginal.name;
        this.cpf = userOriginal.cpf;
        this.email = !!props.email ? props.email : userOriginal.email;
        this.telephone = !!props.telephone ? props.telephone : userOriginal.telephone;
        this.password = !!props.password ? props.password : userOriginal.password;
        this.birthdate = !!props.birthdate ? props.birthdate : userOriginal.birthdate;
        this.gender = !!props.gender ? props.gender : userOriginal.gender;
        this.userType = userOriginal.userType;
        this.token = userOriginal.token;
    }
}
