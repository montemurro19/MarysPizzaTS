import { CreateAddressDTO, UpdateAddressDTO } from './address.DTO';
import { IAddress } from './address.model';
import { AddressRepository } from './address.repository';

export class AddressService {
    private memoryCache: IAddress[] | null = null;
    private repository: AddressRepository;

    constructor() {
        this.repository = new AddressRepository();
    }

    private async cache(userId: string): Promise<IAddress[]> {
        this.memoryCache !== null ? this.memoryCache : (this.memoryCache = await this.repository.get(userId));
        return this.memoryCache;
    }

    async create(address: CreateAddressDTO, userId: string): Promise<IAddress> {
        const addressExists = await this.getByTitle(address.title, userId);

        if (addressExists) {
            throw { error: 'conflict', message: 'endereço já existe' };
        }

        const newAddress = await this.repository.create(address, userId);
        this.memoryCache = null;
        return newAddress;
    }

    async update(id: string, address: UpdateAddressDTO, userId: string): Promise<IAddress | null> {
        const updatedAddress = await this.repository.update(id, address);
        this.memoryCache = null;
        return updatedAddress;
    }

    async delete(id: string): Promise<boolean> {
        const deletedAddress = await this.repository.delete(id);
        this.memoryCache = null;
        return deletedAddress;
    }

    async getAll(userId: string): Promise<IAddress[]> {
        return this.cache(userId);
    }

    async getByTitle(title: string, userId: string): Promise<IAddress | undefined> {
        const addresses = await this.cache(userId);
        return addresses.find((data) => data.title === title);
    }
}
