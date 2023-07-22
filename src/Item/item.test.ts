import { v4 as uuidv4 } from 'uuid';
import itemRepository, { IItemRepository } from './item.repository';
import itemService from './item.service';

// Mock the ItemModel to avoid interacting with the actual database
jest.mock('./Entities/item.model', () => ({
    ItemModel: {
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findOneAndDelete: jest.fn(),
        find: jest.fn()
    }
}));

describe('ItemRepository', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    // Test the create method
    it('should create a new item', async () => {
        const mockCreateItemDTO = { title: 'Test Item', description: 'Test Item', price: 99, type: 'Test Item' };
        const mockCreatedItem = { id: uuidv4(), ...mockCreateItemDTO };
        const mockDbResponse = Promise.resolve(mockCreatedItem);

        // Mock the ItemModel.create function to return the mockCreatedItem
        (itemRepository as IItemRepository).create = jest.fn().mockReturnValue(mockDbResponse);

        const createdItem = await itemRepository.create(mockCreateItemDTO);

        expect(createdItem).toEqual(mockCreatedItem);
        expect(itemRepository.create).toHaveBeenCalledWith(mockCreateItemDTO);
    });

    // Test the update method
    it('should update an existing item', async () => {
        const mockItemId = uuidv4();
        const mockUpdateItemDTO = { title: 'Updated Item' };
        const mockUpdatedItem = { id: mockItemId, ...mockUpdateItemDTO };
        const mockDbResponse = Promise.resolve(mockUpdatedItem);

        // Mock the ItemModel.findOneAndUpdate function to return the mockUpdatedItem
        (itemRepository as IItemRepository).update = jest.fn().mockReturnValue(mockDbResponse);

        const updatedItem = await itemRepository.update(mockItemId, mockUpdateItemDTO);

        expect(updatedItem).toEqual(mockUpdatedItem);
        expect(itemRepository.update).toHaveBeenCalledWith(mockItemId, mockUpdateItemDTO);
    });

    // Test the delete method
    it('should delete an item', async () => {
        const mockItemId = uuidv4();
        const mockDbResponse = Promise.resolve(true);

        // Mock the ItemModel.findOneAndDelete function to return true
        (itemRepository as IItemRepository).delete = jest.fn().mockReturnValue(mockDbResponse);

        const isDeleted = await itemRepository.delete(mockItemId);

        expect(isDeleted).toBe(true);
        expect(itemRepository.delete).toHaveBeenCalledWith(mockItemId);
    });

    // Test the get method
    it('should retrieve all items', async () => {
        const mockItems = [
            { id: uuidv4(), name: 'Item 1' },
            { id: uuidv4(), name: 'Item 2' }
        ];
        const mockDbResponse = Promise.resolve(mockItems);

        // Mock the ItemModel.find function to return the mockItems
        (itemRepository as IItemRepository).get = jest.fn().mockReturnValue(mockDbResponse);

        const items = await itemRepository.get();

        expect(items).toEqual(mockItems);
        expect(itemRepository.get).toHaveBeenCalled();
    });
});

jest.mock('./item.repository', () => ({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    get: jest.fn()
}));

describe('ItemService', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
        itemService['memoryCache'] = null; // Reset the memoryCache after each test
    });

    // Mock user data for testing
    const mockUserAdmin = { userType: 'admin' };
    const mockUserRegular = { userType: 'user' };

    // Test the createItem method
    it('should create a new item if user is admin', async () => {
        const mockCreateItemDTO = { title: 'Test Item', description: 'Test Item', price: 99, type: 'Test Item' };
        const mockCreatedItem = { id: 'abc123', ...mockCreateItemDTO };

        itemRepository.create.mockResolvedValue(mockCreatedItem);

        const newItem = await itemService.createItem(mockCreateItemDTO, mockUserAdmin);

        expect(newItem).toEqual(mockCreatedItem);
        expect(itemRepository.create).toHaveBeenCalledWith(mockCreateItemDTO);
    });

    it('should throw an error when creating a new item if user is not admin', async () => {
        const mockCreateItemDTO = { title: 'New Item', userType: 'regular' };

        await expect(itemService.createItem(mockCreateItemDTO, mockUserRegular)).rejects.toThrowError('sem autorização');

        expect(itemRepository.create).not.toHaveBeenCalled();
    });

    // Test the updateItem method
    it('should update an existing item if user is admin', async () => {
        const mockItemId = 'abc123';
        const mockUpdateItemDTO = { title: 'Updated Item', userType: 'admin' };
        const mockUpdatedItem = { id: mockItemId, ...mockUpdateItemDTO };

        itemRepository.update.mockResolvedValue(mockUpdatedItem);

        const updatedItem = await itemService.updateItem(mockItemId, mockUpdateItemDTO, mockUserAdmin);

        expect(updatedItem).toEqual(mockUpdatedItem);
        expect(itemRepository.update).toHaveBeenCalledWith(mockItemId, mockUpdateItemDTO);
    });

    it('should throw an error when updating an item if user is not admin', async () => {
        const mockItemId = 'abc123';
        const mockUpdateItemDTO = { title: 'Updated Item', userType: 'regular' };

        await expect(itemService.updateItem(mockItemId, mockUpdateItemDTO, mockUserRegular)).rejects.toThrowError('sem autorização');

        expect(itemRepository.update).not.toHaveBeenCalled();
    });

    // Test the deleteItem method
    it('should delete an item if user is admin', async () => {
        const mockItemId = 'abc123';

        itemRepository.delete.mockResolvedValue(true);

        const isDeleted = await itemService.deleteItem(mockItemId, mockUserAdmin);

        expect(isDeleted).toBe(true);
        expect(itemRepository.delete).toHaveBeenCalledWith(mockItemId);
    });

    it('should throw an error when deleting an item if user is not admin', async () => {
        const mockItemId = 'abc123';

        await expect(itemService.deleteItem(mockItemId, mockUserRegular)).rejects.toThrowError('sem autorização');

        expect(itemRepository.delete).not.toHaveBeenCalled();
    });

    // Test the getAllItems method
    it('should retrieve all items from the cache', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1' },
            { id: 'item2', title: 'Item 2' }
        ];
        itemService['memoryCache'] = mockItems;

        const items = await itemService.getAllItems();

        expect(items).toEqual(mockItems);
    });

    // Test the getItemById method
    it('should retrieve an item by ID from the cache', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1' },
            { id: 'item2', title: 'Item 2' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemId = 'item2';
        const expectedItem = mockItems[1];
        const item = await itemService.getItemById(itemId);

        expect(item).toEqual(expectedItem);
    });

    it('should return undefined when retrieving an item by ID if the item is not found', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1' },
            { id: 'item2', title: 'Item 2' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemId = 'nonexistent';
        const item = await itemService.getItemById(itemId);

        expect(item).toBeUndefined();
    });

    // Test the getItemByTitle method
    it('should retrieve an item by title from the cache', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1' },
            { id: 'item2', title: 'Item 2' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemTitle = 'Item 2';
        const expectedItem = mockItems[1];
        const item = await itemService.getItemByTitle(itemTitle);

        expect(item).toEqual(expectedItem);
    });

    it('should return undefined when retrieving an item by title if the item is not found', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1' },
            { id: 'item2', title: 'Item 2' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemTitle = 'Nonexistent Item';
        const item = await itemService.getItemByTitle(itemTitle);

        expect(item).toBeUndefined();
    });

    // Test the getItemByType method
    it('should retrieve items by type from the cache', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1', type: 'type1' },
            { id: 'item2', title: 'Item 2', type: 'type2' },
            { id: 'item3', title: 'Item 3', type: 'type1' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemType = 'type1';
        const expectedItems = [mockItems[0], mockItems[2]];
        const items = await itemService.getItemByType(itemType);

        expect(items).toEqual(expectedItems);
    });

    it('should return an empty array when retrieving items by type if no items are found', async () => {
        const mockItems = [
            { id: 'item1', title: 'Item 1', type: 'type1' },
            { id: 'item2', title: 'Item 2', type: 'type2' },
            { id: 'item3', title: 'Item 3', type: 'type1' }
        ];
        itemService['memoryCache'] = mockItems;

        const itemType = 'nonexistentType';
        const items = await itemService.getItemByType(itemType);

        expect(items).toEqual([]);
    });
});
