import { Router } from 'express';
import ItemController from '../controllers/Item';
import ItemService from '../services/Item';

const router = Router();
const itemService = new ItemService();
const itemController = new ItemController(itemService);

router.get('/', itemController.getAll);

export { router };
