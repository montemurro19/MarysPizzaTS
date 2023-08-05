import { NextFunction, Request, Response } from 'express';
import addressService from './address.service';

class AddressController {
    async createAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, cep, street, number, neighborhood, city, landmark } = req.body;
            const newAddress = await addressService.createAddress({ title, cep, street, number, neighborhood, city, landmark }, req.user);
            res.status(201).json(newAddress);
        } catch (e) {
            next(e);
        }
    }

    async updateAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedAddress = await addressService.updateAddress(req.params.id, req.body, req.user);
            if (!updatedAddress) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(updatedAddress);
        } catch (e) {
            next(e);
        }
    }

    async deleteAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedAddress = await addressService.deleteAddress(req.params.id);
            if (!deletedAddress) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(deletedAddress);
        } catch (e) {
            next(e);
        }
    }

    async getAllAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const addresses = await addressService.getAllAddress(req.user);
            res.status(200).json(addresses);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const address = await addressService.getAddressById(req.params.id, req.user);
            res.status(200).json(address);
        } catch (e) {
            next(e);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const address = await addressService.getAddressByTitle(req.params.title, req.user);
            if (!address) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(address);
        } catch (e) {
            next(e);
        }
    }
}

export default new AddressController();
