import { IUser } from '../User/Entities/user.model';
import { CreateAddressDTO, UpdateAddressDTO } from './Entities/address.DTO';
import { IAddress } from './Entities/address.model';
import addressRepository from './address.repository';

class AddressService {
    private memoryCache: IAddress[] | null = null;

    private async cache(userId: string): Promise<IAddress[]> {
        if (!this.memoryCache) {
            this.memoryCache = await addressRepository.get(userId);
        }
        return this.memoryCache;
    }

    async createAddress(address: CreateAddressDTO, user: IUser): Promise<IAddress> {
        const addresses = await this.cache(user.id);
        const addressExists = addresses.find((data) => data.title === address.title);

        if (addressExists) {
            throw new Error('endereço já cadastrado');
        }

        const newAddress = await addressRepository.create({ ...address, userId: user.id });

        this.memoryCache = null;

        return newAddress;
    }

    async updateAddress(id: string, newAddress: UpdateAddressDTO, user: IUser): Promise<IAddress | null> {
        const addresses = await this.cache(user.id);
        const address = addresses.find((data) => data.id === id);

        if (!address) {
            throw new Error('address not found');
        }

        const updatedAddress = await addressRepository.update(id, newAddress);

        this.memoryCache = null;

        return updatedAddress;
    }

    async deleteAddress(id: string): Promise<boolean> {
        const deletedAddress = await addressRepository.delete(id);

        this.memoryCache = null;

        return deletedAddress;
    }

    async getAllAddress(user: IUser): Promise<IAddress[]> {
        const addresses = this.cache(user.id);

        return addresses;
    }

    async getAddressById(id: string, user: IUser): Promise<IAddress | undefined> {
        const addresses = await this.cache(user.id);
        const address = addresses.find((data) => data.id === id);

        return address;
    }

    async getAddressByTitle(title: string, user: IUser): Promise<IAddress | undefined> {
        const addresses = await this.cache(user.id);
        const address = addresses.find((data) => data.title === title);

        return address;
    }
}

export default new AddressService();
