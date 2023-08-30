import { v4 } from 'uuid';
import { CreateAddressDTO, UpdateAddressDTO } from './address.DTO';
import { AddressModel, IAddress } from './address.model';

export class AddressRepository {
    async create(address: CreateAddressDTO, userId: string): Promise<IAddress> {
        const id = v4();

        const newAddress: IAddress = { ...address, id, userId };

        return await AddressModel.create(newAddress);
    }

    async update(id: string, address: UpdateAddressDTO): Promise<IAddress | null> {
        return await AddressModel.findOneAndUpdate({ id }, address, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return !!(await AddressModel.findOneAndDelete({ id }));
    }

    async get(userId: string): Promise<IAddress[]> {
        return await AddressModel.find({ userId });
    }
}
