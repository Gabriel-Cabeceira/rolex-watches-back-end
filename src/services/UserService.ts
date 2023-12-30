import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRespository";
import { sign } from 'jsonwebtoken';


export class UserService {

    private userRepository: UserRepository

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository
    }


    // Function that create users in Data Base
    createUser = (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password)
        return this.userRepository.createUser(user)
    }

    // Function that get all users in Data Base
    getUser = async (userId: string): Promise<User | null> => {
        return this.userRepository.getUser(userId)
    }

    // Function that returns the authenticated user
    getAuthenticatedUser = (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password)
    }

    // Function that gets the token
    getToken = async (email: string, password: string): Promise<string | object> => {

        const user = await this.getAuthenticatedUser(email, password)
        
        if(!user){
            throw new Error('Email ou Senha inválidos');
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.user_id
        }

        const token = sign(tokenData, tokenKey, tokenOptions)

        return { token: token, userId: user?.user_id };
    }


    // // Functions taht delete users from Data Base
    // deleteUser = (email: string): boolean | undefined => {
    //     const userIndex = this.db.findIndex(user => user.email === email);
    //     let deleted = false

    //     if(userIndex !== -1){
    //         deleted = true;
    //         if(deleted){
    //             this.db.splice(userIndex, 1);
    //             return deleted;
    //         }
    //     } else {
    //         return deleted;
    //     }
    // }
}