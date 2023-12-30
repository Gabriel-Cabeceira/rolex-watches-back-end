import express, { Request, Response } from 'express';
import { UserController } from './controllers/UserController';
import { router } from './routes';
const cors = require('cors');


const server = express();

const port: number = 5000

const userController = new UserController();

server.use(express.json());

server.use(cors());

server.use(router)



// Rota GET
server.get('/', (req: Request, res: Response) => {
    return res.status(200).json({message: 'Rolex Store clone API'})
})



// Server running
server.listen(port, () => console.log(`Server running on port ${port}`));