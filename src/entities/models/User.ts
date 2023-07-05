import { v4 } from 'uuid';

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
}

export class User implements IUser {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public telephone: string;
    public password: string;
    public birthdate: Date;
    public gender: string;
    public userType: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        this.name = props.name;
        this.cpf = props.cpf;
        this.email = props.email;
        this.telephone = props.telephone;
        this.password = props.password;
        this.birthdate = props.birthdate;
        this.gender = props.gender;
        this.userType = props.userType;
        this.id = id ? id : v4();
    }
}
