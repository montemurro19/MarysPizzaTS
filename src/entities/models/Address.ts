import { v4 } from 'uuid';

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

export class createAddress implements IAddress {
    public readonly id: string;
    public userId: string;
    public title: string;
    public cep: string;
    public street: string;
    public number: string;
    public neighborhood: string;
    public city: string;
    public landmark: string;

    constructor(props: any) {
        this.userId = props.userId;
        this.title = props.title;
        this.cep = props.cep;
        this.street = props.street;
        this.number = props.number;
        this.neighborhood = props.neighborhood;
        this.city = props.city;
        this.landmark = props.landmark;
        this.id = v4();
    }
}

export class updateAddress implements IAddress {
    public id: string;
    public userId: string;
    public title: string;
    public cep: string;
    public street: string;
    public number: string;
    public neighborhood: string;
    public city: string;
    public landmark: string;

    constructor(props: any, originalAddress: IAddress) {
        this.id = originalAddress.id;
        this.userId = originalAddress.userId;
        this.title = !!props.title ? props.title : originalAddress.title;
        this.cep = !!props.cep ? props.cep : originalAddress.cep;
        this.street = !!props.street ? props.street : originalAddress.street;
        this.number = !!props.number ? props.number : originalAddress.number;
        this.neighborhood = !!props.neighborhood ? props.neighborhood : originalAddress.neighborhood;
        this.city = !!props.city ? props.city : originalAddress.city;
        this.landmark = !!props.landmark ? props.landmark : originalAddress.landmark;
    }
}
