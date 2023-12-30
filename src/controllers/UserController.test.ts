import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserController } from "./UserController";
import { Request } from 'express';

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
});


describe('User controller', () => {

    const userController = new UserController()

    const mockResponse = makeMockResponse();

    it('A função createUser deve retornar que o nome é obrigatório', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'teste@teste.com',
                password: 'Senha123'
            }
        } as Request

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Nome obrigatório'})
    })

    it('A função createUser deve retornar que o email é obrigatório', () => {
        const mockRequest = {
            body: {
                name: 'Teste',
                email: '',
                password: 'Senha123'
            }
        } as Request

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Email obrigatório'})
    })

    it('A função createUser deve ser chamada e criar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Gabriel Cabeceira',
                email: 'gabriel@dio.com',
                password: 'Senha123'
            }
        } as Request

        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário criado com sucesso'});
    })

    it('Deve retornar o usuário com o userId informado', async () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }
        });

        await userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })

})