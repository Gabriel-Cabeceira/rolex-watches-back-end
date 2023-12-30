import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository{
    private maneger: EntityManager

    constructor(maneger: EntityManager){
        this.maneger = maneger
    }

    createUser = async (user: User): Promise<User> => {
        return this.maneger.save(user)
    }

    getUser = async (userId: string): Promise<User | null> => {
        return this.maneger.findOne(User, {
            where: {
                user_id: userId
            }
        })
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.maneger.findOne(User, {
            where: {
                email,
                password
            }
        })
    }
}