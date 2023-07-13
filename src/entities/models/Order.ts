import { v4 } from 'uuid';

export interface IOrder {
    id: string;
    userId: string;
    items: {
        amount: number;
        itemId: string;
    }[];
    addressId: string;
    notes: string;
    status: string;
    paymentMethod: string;
    rating: number;
    orderDate: Date;
}

export class createOrder implements IOrder {
    id: string;
    userId: string;
    items: { amount: number; itemId: string }[];
    addressId: string;
    notes: string;
    status: string;
    paymentMethod: string;
    rating: number;
    orderDate: Date;

    constructor(props: any) {
        this.userId = props.userId;
        this.items = props.items;
        this.addressId = props.addressId;
        this.notes = props.notes;
        this.status = 'aguardando confirmação';
        this.paymentMethod = props.paymentMethod;
        this.rating = 0;
        this.orderDate = new Date();
        this.id = v4();
    }
}
