import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function verifyAuth (req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization

    if(authToken){
        const token = authToken.replace('Bearer ', '');


        try {
            const { sub } = verify(token, '123456789');
            console.log('Token for user', sub)
            return next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({message: 'ERRO'})
        }
    }

    return res.status(401).json({message: 'Unathorized'})
}