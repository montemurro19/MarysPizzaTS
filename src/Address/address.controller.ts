import { Request, Response } from 'express';
import { CreateAddressDTO, UpdateAddressDTO } from './Entities/address.DTO';
import addressService from './address.service';

class AddressController {
    async createAddress(req: Request, res: Response) {
        const address = req.body;
        try {
            const newAddress = await addressService.createAddress(address, req.user);
            res.status(201).json(newAddress);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o endereço', e });
        }
    }
    async updateAddress(req: Request, res: Response) {
        const id = req.params.id;
        const address: UpdateAddressDTO = req.body;
        try {
            const updatedAddress = await addressService.updateAddress(id, address, req.user);
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
        try {
            const addresses = await addressService.getAllAddress(req.user);
            res.status(200).json(addresses);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
    async getById(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const address = await addressService.getAddressById(id, req.user);
            res.status(200).json(address);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
    async getByTitle(req: Request, res: Response) {
        const title = req.params.title;
        try {
            const address = await addressService.getAddressByTitle(title, req.user);
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
