import { IUser } from '../User/Entities/user.model';
import { CreateItemDTO, UpdateItemDTO } from './Entities/item.DTO';
import { IItem } from './Entities/item.model';
import { ItemRepository } from './item.repository';

export class ItemService {
    private memoryCache: IItem[] | null = null;
    private itemRepository: ItemRepository;

    constructor() {
        this.itemRepository = new ItemRepository();
    }

    private async cache(): Promise<IItem[]> {
        this.memoryCache !== null ? this.memoryCache : (this.memoryCache = await this.itemRepository.get());
        return this.memoryCache;
    }

    async createItem(item: CreateItemDTO, user: IUser): Promise<IItem> {
        const itemExists = await this.getItemByTitle(item.title);
        if (itemExists) {
            throw { error: 'conflict', message: 'Item já cadastrado' };
        }

        const newItem = await this.itemRepository.create(item);
        this.memoryCache = null;
        return newItem;
    }

    async updateItem(id: string, item: UpdateItemDTO, user: IUser): Promise<IItem | null> {
        if (user.userType !== 'admin') {
            throw { error: 'unauthorized', message: 'sem autorização' };
        }

        const updatedItem = await this.itemRepository.update(id, item);
        this.memoryCache = null;
        return updatedItem;
    }

    async deleteItem(id: string, user: IUser): Promise<boolean> {
        if (user.userType !== 'admin') {
            throw { error: 'unauthorized', message: 'sem autorização' };
        }

        const deletedItem = await this.itemRepository.delete(id);
        this.memoryCache = null;
        return deletedItem;
    }

    async getAllItems(): Promise<IItem[]> {
        const items = this.cache();
        return items;
    }
    //consertar esse undefined
    async getItemById(id: string): Promise<IItem | undefined> {
        const items = await this.cache();
        const item = items.find((data) => data.id === id);
        return item;
    }
    //consertar esse undefined
    async getItemByTitle(title: string): Promise<IItem | undefined> {
        const items = await this.cache();
        const item = items.find((data) => data.title === title);
        return item;
    }
    //adicionar uma verificação de tamanho da lista
    async getItemByType(type: string): Promise<IItem[] | null> {
        const items = await this.cache();
        const itemsByType = items.filter((item) => item.type === type);
        return itemsByType;
    }
}
