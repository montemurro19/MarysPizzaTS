import { Request, Response, NextFunction } from 'express';
import Token from './token'

class AuthController {
    async auth(req: Request, res: Response, next: NextFunction) {
        if(!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            res.status(403).json({ message: 'no token' })
            return
        }

        const token = req.headers.authorization.split(' ')[1]
        const user = Token.auth(token)

        if(user === null) {
            res.status(404).json({message: 'user not found'})
            return
        }

        req.user = user
        next()
    }
}