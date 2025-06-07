import * as userRepository from "../repositories/user-repository";
import { noContent, notFound, ok } from "../utils/http-helper"


export const getUser = async () => {
    const data = await userRepository.findAllUsers();
    let response = null

    if (data) response = await ok(data);
    else response = await noContent();
    
    return response;
}


export const getUserById = async (userId: number) => {
    const data = await userRepository.findUserById(userId);
    let response = null

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}


export const getUserByEmail = async (email: string) => {
    const data = await userRepository.findUserByEmail(email);
    let response = null

    if (data) response = await ok(data);
    else response = await notFound();

    return response;
}


export const createUser = async (userData: any) => {
    const newUser = {
        id: Date.now(),
        ...userData,
        dataCadastro: new Date(),
        dataAtualizacao: new Date(),
        ultimoAcesso: null
    };
    
    return ok(newUser);
}


export const updateUser = async (userId: number, userData: any) => {
    const updatedUser = {
        id: userId,
        ...userData,
        dataAtualizacao: new Date(),
        ultimoAcesso: null
    };
    
    return ok(updatedUser);
}


export const deleteUser = async (userId: number) => {
    return ok({ message: `User with ID ${userId} deleted successfully.` });
}
