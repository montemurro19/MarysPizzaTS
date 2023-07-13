import { v4 } from 'uuid';

export interface IItem {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
}

export class createItem implements IItem {
    public readonly id: string;
    public title: string;
    public description: string;
    public price: number;
    public type: string;

    constructor(props: Omit<createItem, 'id'>) {
        this.title = props.title;
        this.description = props.description;
        this.price = props.price;
        this.type = props.type;
        this.id = v4();
    }
}

export class updateItem implements IItem {
    public id: string;
    public title: string;
    public description: string;
    public price: number;
    public type: string;

    constructor(props: any, itemOriginal: IItem) {
        this.id = itemOriginal.id;
        this.title = !!props.title ? props.title : itemOriginal.title;
        this.description = !!props.description ? props.description : itemOriginal.description;
        this.price = !!props.price ? props.price : itemOriginal.price;
        this.type = !!props.type ? props.type : itemOriginal.type;
    }
}
