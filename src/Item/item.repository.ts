import { v4 } from 'uuid';
import { IItem, ItemModel } from './item.model';
import { CreateItemDTO, UpdateItemDTO } from './item.DTO';

export class ItemRepository {
    async create(item: CreateItemDTO): Promise<IItem> {
        const id = v4();

        const newItem: IItem = { ...item, id };

        return await ItemModel.create(newItem);
    }

    async update(id: string, item: UpdateItemDTO): Promise<IItem | null> {
        return await ItemModel.findOneAndUpdate({ id }, item, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return !!(await ItemModel.findOneAndDelete({ id }));
    }

    async get(): Promise<IItem[]> {
        return await ItemModel.find();
    }
}
