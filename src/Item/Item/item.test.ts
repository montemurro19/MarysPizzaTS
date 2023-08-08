import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ItemController from './item.controller';
import ItemService from './item.service';
import ItemRepository from './item.repository';
import { CreateItemDTO, UpdateItemDTO } from './Entities/item.DTO';
import { ItemModel } from './Entities/item.model';

jest.mock('./item.repository');

describe('ItemService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Mock a sample item and user for testing
    const sampleItem: CreateItemDTO = { title: 'Sample Item', description: 'Sample Description', price: 99, type: 'Sample type' };
    const sampleUser = {
        id: 'user-id',
        name: 'John Doe',
        cpf: '12345678900',
        email: 'john.doe@example.com',
        telephone: '1234567890',
        password: 'password',
        birthdate: new Date('1990-01-01'),
        gender: 'male',
        userType: 'admin',
        token: 'sample-token'
    };

    it('should create a new item if the user is an admin', async () => {
        (ItemRepository.get as jest.Mock).mockResolvedValueOnce(undefined); // Mock item not found
        (ItemRepository.create as jest.Mock).mockResolvedValueOnce(sampleItem); // Mock the creation

        const newItem = await ItemService.createItem(sampleItem, sampleUser);

        expect(newItem).toEqual(sampleItem);
    });

    it('should throw an error when trying to create a duplicate item', async () => {
        (ItemRepository.get as jest.Mock).mockResolvedValueOnce(sampleItem); // Mock item found

        await expect(ItemService.createItem(sampleItem, sampleUser)).rejects.toThrow('Item já cadastrado');
    });

    // Add more tests for other methods in the ItemService class
});

describe('ItemRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new item', async () => {
        const newItemData: CreateItemDTO = { title: 'Sample Item', description: 'Sample Description', price: 10.99, type: 'sample' };
        (uuidv4 as jest.Mock).mockReturnValueOnce('generated-id'); // Mock the UUID generation
        (ItemModel.create as jest.Mock).mockResolvedValueOnce({ ...newItemData, id: 'generated-id' }); // Mock the creation

        const newItem = await ItemRepository.create(newItemData);

        expect(newItem).toEqual({ ...newItemData, id: 'generated-id' });
    });

    it('should update an existing item', async () => {
        const itemId = 'existing-item-id';
        const updatedItemData: UpdateItemDTO = { title: 'Updated Item', description: 'Updated Description' };
        (ItemModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(updatedItemData); // Mock the update

        const updatedItem = await ItemRepository.update(itemId, updatedItemData);

        expect(updatedItem).toEqual(updatedItemData);
    });

    // Add more tests for other methods in the ItemRepository class
});

describe('ItemController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Mock a sample request and response for testing
    const mockRequest = { body: { title: 'Sample Item', description: 'Sample Description' }, user: { userType: 'admin' } };
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    it('should create a new item', async () => {
        (ItemService.createItem as jest.Mock).mockResolvedValueOnce(mockRequest.body); // Mock the service response

        await ItemController.createItem(mockRequest as Request, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body);
    });

    it('should handle errors when creating an item', async () => {
        (ItemService.createItem as jest.Mock).mockRejectedValueOnce(new Error('Failed to create item')); // Mock a failed request

        await ItemController.createItem(mockRequest as Request, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ erro: 'falha ao criar o item' });
    });

    // Add more tests for other methods in the ItemController class
});
