import { Request, Response, NextFunction } from 'express';
import { AddressService } from './address.service';

export class AddressController {
    private service: AddressService;

    constructor() {
        this.service = new AddressService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, cep, street, number, neighborhood, city, landmark } = req.body;

            if (!title || !cep || !street || !number || !neighborhood || !city || !landmark) {
                throw { message: 'preencha todos os campos' };
            }

            const createdAddress = await this.service.create({ title, cep, street, number, neighborhood, city, landmark }, req.user.id);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedAddress = await this.service.update(req.params.id, req.body, req.user.id);

            if (!updatedAddress) {
                throw { message: 'falha ao atualizar o endereço' };
            }

            res.status(200).json(updatedAddress);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedAddress = await this.service.delete(req.params.id);

            if (!deletedAddress) {
                throw { message: 'falha ao deletar o endereço' };
            }

            res.status(200).json({ message: 'endereço deletado' });
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const addresses = await this.service.getAll(req.user.id);
            return res.status(200).json(addresses);
        } catch (err) {
            next(err);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const address = await this.service.getByTitle(req.params.title, req.user.id);

            if (!address) {
                throw { message: 'endereço não encontrado' };
            }

            res.status(200).json(address);
        } catch (err) {
            next(err);
        }
    }
}
