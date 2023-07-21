import { v4 } from 'uuid';
import { CreateItemDTO, UpdateItemDTO } from './Entities/item.DTO';
import { IItem, ItemModel } from './Entities/item.model';

export interface IItemRepository {
    create(item: CreateItemDTO): Promise<IItem>;
    update(id: string, item: UpdateItemDTO): Promise<IItem | null>;
    delete(id: string): Promise<boolean>;
    get(): Promise<IItem[]>;
}

class ItemRepository implements IItemRepository {
    async create(item: CreateItemDTO): Promise<IItem> {
        const id = v4();

        const newItem: IItem = {
            ...item,
            id: id
        };

        const createdItem = await ItemModel.create(newItem);
        return createdItem;
    }
    async update(id: string, item: UpdateItemDTO): Promise<IItem | null> {
        const updatedItem = await ItemModel.findOneAndUpdate({ id }, item, { new: true });
        return updatedItem;
    }
    async delete(id: string): Promise<boolean> {
        const result = await ItemModel.findOneAndDelete({ id });
        return !!result;
    }
    async get(): Promise<IItem[]> {
        const items = await ItemModel.find();
        return items;
    }
}

export default new ItemRepository();
