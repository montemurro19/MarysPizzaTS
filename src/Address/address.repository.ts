import { v4 } from 'uuid';
import { CreateAddressDTO, UpdateAddressDTO } from './Entities/address.DTO';
import { AddressModel, IAddress } from './Entities/address.model';

export interface IAddressRepository {
    create(userId: string, address: CreateAddressDTO): Promise<IAddress>;
    update(id: string, address: UpdateAddressDTO): Promise<IAddress | null>;
    delete(id: string): Promise<boolean>;
    get(userId: string): Promise<IAddress[]>;
}

class AddressRepository implements IAddressRepository {
    async create(userId: string, address: CreateAddressDTO): Promise<IAddress> {
        const id = v4();

        const newAddress: IAddress = {
            ...address,
            userId: userId,
            id: id
        };

        const createdAddress = await AddressModel.create(newAddress);
        return createdAddress;
    }
    async update(id: string, address: UpdateAddressDTO): Promise<IAddress | null> {
        const updatedAddress = await AddressModel.findOneAndUpdate({ id }, address, { new: true });
        return updatedAddress;
    }
    async delete(id: string): Promise<boolean> {
        const result = await AddressModel.findOneAndDelete({ id });
        return !!result;
    }
    async get(id: string): Promise<IAddress[]> {
        const address = await AddressModel.find({ userId: id });
        return address;
    }
}

export default new AddressRepository();
