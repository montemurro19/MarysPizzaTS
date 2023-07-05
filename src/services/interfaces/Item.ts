import { Item } from '../../entities/models/Item';

export interface IItemService {
    getAll(): Promise<Item[]>;
    getById(id: string): Promise<Item | null>;
    getByname(title: string): Promise<Item | null>;
    createItem(item: Item): Promise<Item>;
    updateItem(id: string, item: Item): Promise<Item | null>;
    deleteItem(id: string): Promise<boolean>;
}
