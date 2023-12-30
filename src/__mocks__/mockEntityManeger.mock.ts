import { EntityManager } from "typeorm";

interface MockManegerArgs {
    saveReturn?: object | [object],
    findOneReturn?: object 
}


export const getMockEntityManeger = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}:MockManegerArgs): Promise<EntityManager> => {
    const maneger: Partial<EntityManager> = {}

    maneger.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))
    maneger.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))

    return maneger as EntityManager
}