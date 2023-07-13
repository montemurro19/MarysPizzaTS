import { IAddress } from '../entities/models/interface/Address';
import { AddressModel } from '../entities/schema/Address';

export interface IAddressService {
    getAll(userId: string): Promise<IAddress[] | null>;
    getById(id: string): Promise<IAddress | null>;
    create(address: IAddress): Promise<IAddress>;
    update(id: string, address: IAddress): Promise<IAddress | null>;
    delete(id: string): Promise<boolean>;
}

class AddressService implements IAddressService {
    async getAll(userId: string): Promise<IAddress[] | null> {
        return await AddressModel.find({ userId: userId });
    }
    async getById(id: string): Promise<IAddress | null> {
        return await AddressModel.findOne({ id: id });
    }
    async create(address: IAddress): Promise<IAddress> {
        return await AddressModel.create(address);
    }
    async update(id: string, address: IAddress): Promise<IAddress | null> {
        return await AddressModel.findByIdAndUpdate(id, address);
    }
    async delete(id: string): Promise<boolean> {
        const deletedAddress = await AddressModel.findByIdAndDelete(id);
        return !!deletedAddress;
    }
}

export default AddressService;
