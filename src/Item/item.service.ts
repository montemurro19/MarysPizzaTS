import { CreateItemDTO, UpdateItemDTO } from './item.DTO';
import { IItem } from './item.model';
import { ItemRepository } from './item.repository';

export class ItemService {
    private memoryCache: IItem[] | null = null;
    private repository: ItemRepository;

    constructor() {
        this.repository = new ItemRepository();
    }

    private async cache(): Promise<IItem[]> {
        this.memoryCache !== null ? this.memoryCache : (this.memoryCache = await this.repository.get());
        return this.memoryCache;
    }

    async create(item: CreateItemDTO): Promise<IItem> {
        const itemExists = await this.getByTitle(item.title);
        if (itemExists) {
            throw { error: 'conflict', message: 'item já cadastrado' };
        }

        const newItem = await this.repository.create(item);
        this.memoryCache = null;
        return newItem;
    }

    async update(id: string, item: UpdateItemDTO): Promise<IItem | null> {
        const updatedItem = await this.repository.update(id, item);
        this.memoryCache = null;
        return updatedItem;
    }

    async delete(id: string): Promise<boolean> {
        const deletedItem = await this.repository.delete(id);
        this.memoryCache = null;
        return deletedItem;
    }

    async getAll(): Promise<IItem[]> {
        return this.cache();
    }

    async getById(id: string): Promise<IItem | undefined> {
        const items = await this.cache();
        return items.find((data) => data.id === id);
    }

    async getByTitle(title: string): Promise<IItem | undefined> {
        const items = await this.cache();
        return items.find((data) => data.title === title);
    }

    async getByType(type: string): Promise<IItem[] | null> {
        const items = await this.cache();
        return items.filter((data) => data.type === type);
    }
}
