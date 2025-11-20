import { IUser } from "../models/user-model";
import * as userRepository from "../repositories/user-repository";
import { noContent, notFound, ok } from "../utils/http-helper"


export const getUser = async () => {
    const data = await userRepository.findAllUsers();
    let response = null

    await userRepository.findAllUsers();

    if (data) response = await ok(data);
    else response = await noContent();
    
    return response;
}


export const getUserById = async (userId: number) => {
    const data = await userRepository.findUserById(userId);
    let response = null

    await userRepository.findUserById(userId);

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}


export const getUserByEmail = async (email: string) => {
    const data = await userRepository.findUserByEmail(email);
    let response = null

    await userRepository.findUserByEmail(email);

    if (data) response = await ok(data);
    else response = await notFound();

    return response;
}


export const createUser = async (userData: IUser) => {
    const newUser = {
        ...userData,
        dataCadastro: new Date(),
        dataAtualizacao: new Date()
    };

    await userRepository.createUser(newUser);
    
    return ok(newUser);
}


export const updateUser = async (userId: number, userData: any) => {
    const updatedUser = {
        id: userId,
        ...userData,
        dataAtualizacao: new Date()
    };

    await userRepository.updateUser(userId, updatedUser);
    
    return ok(updatedUser);
}


export const deleteUser = async (userId: number) => {
    await userRepository.deleteUser(userId);

    return ok({ message: `User with ID ${userId} deleted successfully.` });
}
