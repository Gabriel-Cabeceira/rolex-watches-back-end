import { EntityManager } from "typeorm"
import { getMockEntityManeger } from "../__mocks__/mockEntityManeger.mock"
import { UserRepository } from "./UserRespository"
import { User } from "../entities/User"


describe('UserRepository',() => {

    let userRepository: UserRepository
    let manegerMock: Partial<EntityManager>

    const mockUser: User = {
        user_id: '12345',
        name: 'Test User da Silva',
        email: 'test@dio.com',
        password: 'Senha555'
    }

    beforeAll(async () => {
        manegerMock = await getMockEntityManeger({
            saveReturn: mockUser
        })
        userRepository = new UserRepository(manegerMock as EntityManager)
    })

    it('Deve cadastrar um novo usuário no Banco de dados', async () => {
        const response = await userRepository.createUser(mockUser)
        expect(manegerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})