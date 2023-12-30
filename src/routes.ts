import { Router } from "express";
import { UserController } from './controllers/UserController';
import { LoginController } from "./controllers/LoginController";
import { verifyAuth } from "./midleware/verifyAuth";


export const router = Router();

// Controller para funções do User
const userController = new UserController();

// Controller para funções de Login
const loginController = new LoginController();


// ------------ Rotas User ------------
// Rota POST para criar usuários 
router.post('/user', userController.createUser);

// Rota GET para pegar os dados do usuário no db (ROTA PROTEGIDA, NECESSÁRIO AUTENTICAÇÃO)
router.get('/user/:userId', verifyAuth, userController.getUser)



// ------------ Rotas Login ------------

router.post('/login', loginController.login)