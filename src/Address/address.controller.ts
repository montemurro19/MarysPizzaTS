import { Request, Response } from 'express';
import addressService from './address.service';

class AddressController {
    async createAddress(req: Request, res: Response) {
        try {
            const newAddress = await addressService.createAddress(req.body, req.user);
            res.status(201).json(newAddress);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o endereço', e });
        }
    }

    async updateAddress(req: Request, res: Response) {
        try {
            const updatedAddress = await addressService.updateAddress(req.params.id, req.body, req.user);
            if (!updatedAddress) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(updatedAddress);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o endereço' });
        }
    }

    async deleteAddress(req: Request, res: Response) {
        try {
            const deletedAddress = await addressService.deleteAddress(req.params.id);
            if (!deletedAddress) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(deletedAddress);
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
        try {
            const address = await addressService.getAddressById(req.params.id, req.user);
            res.status(200).json(address);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }

    async getByTitle(req: Request, res: Response) {
        try {
            const address = await addressService.getAddressByTitle(req.params.title, req.user);
            if (!address) {
                res.status(404).json({ erro: 'endereço não encontrado' });
            }
            res.status(200).json(address);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar os endereços' });
        }
    }
}

export default new AddressController();
