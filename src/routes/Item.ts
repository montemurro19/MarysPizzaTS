import { Router } from 'express';
import ItemService from '../services/Item';
import UserService from '../services/User';
import ItemController from '../controllers/Item';
import AuthMiddleware from '../Middleware/Auth';

const item = Router();
const itemService = new ItemService();
const itemController = new ItemController(itemService);

const userService = new UserService();
const authMiddleware = new AuthMiddleware(userService);

item.get('/', (req, res, next) => authMiddleware.auth(req, res, next), itemController.getAll.bind(itemController));
item.get('/:id', itemController.getById.bind(itemController));
item.post('/', itemController.create.bind(itemController));
item.put('/:id', itemController.update.bind(itemController));
item.delete('/:id', itemController.delete.bind(itemController));

export { item };
