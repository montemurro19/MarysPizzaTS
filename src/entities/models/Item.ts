import { v4 } from 'uuid';

export interface IItem {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
}

export class Item implements IItem {
    public readonly id: string;
    public title: string;
    public description: string;
    public price: number;
    public type: string;

    constructor(props: Omit<Item, 'id'>, id?: string) {
        this.title = props.title;
        this.description = props.description;
        this.price = props.price;
        this.type = props.type;
        this.id = id ? id : v4();
    }
}
