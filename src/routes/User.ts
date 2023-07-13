import { Router } from 'express';
import UserService from '../service/User';
import UserController from '../controllers/user.controller';

const user = Router();
const userService = new UserService();
const userController = new UserController(userService);

user.post('/', (req, res) => userController.create(req, res));
user.put('/:id', (req, res) => userController.update(req, res));

export { user };
