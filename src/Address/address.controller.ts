import { Request, Response } from 'express';
import { CreateAddressDTO, UpdateAddressDTO } from './Entities/address.DTO';
import addressService from './address.service';

class AddressController {
    async createAddress(req: Request, res: Response) {
        const address: CreateAddressDTO = req.body;
        const user = req.user;
        try {
            const newAddress = await addressService.createAddress(address, user);
            res.status(201).json(newAddress);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o endereço' });
        }
    }
    async updateAddress(req: Request, res: Response) {
        const id = req.params.id;
        const address: UpdateAddressDTO = req.body;
        const user = req.user;
        try {
            const updatedAddress = await addressService.updateAddress(id, address, user);
            if (updatedAddress) {
                res.status(200).json(updatedAddress);
            } else {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o endereço' });
        }
    }
    async deleteAddress(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const deletedAddress = await addressService.deleteAddress(id);
            if (deletedAddress) {
                res.status(200).json(deletedAddress);
            } else {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao deletar endereço' });
        }
    }
    async getAllAddress(req: Request, res: Response) {
        const user = req.user;
        try {
            const addresses = await addressService.getAllAddress(user);
            res.status(200).json(addresses);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
    async getById(req: Request, res: Response) {
        const id = req.params.id;
        const user = req.user;
        try {
            const address = await addressService.getAddressById(id, user);
            res.status(200).json(address);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
    async getByTitle(req: Request, res: Response) {
        const user = req.user;
        const title = req.params.title;
        try {
            const address = await addressService.getAddressByTitle(title, user);
            if (address) {
                res.status(200).json(address);
            } else {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
}

export default new AddressController();
