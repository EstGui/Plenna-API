import { Request, Response } from 'express';
import * as userService from '../services/user-service';


export const getUsers = async (req: Request, res: Response) => {
    const httpResponse = await userService.getUser();

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const httpResponse = await userService.getUserById(parseInt(userId));

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    const httpResponse = await userService.getUserByEmail(email);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    const httpResponse = await userService.createUser(userData);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData = req.body;
    const httpResponse = await userService.updateUser(parseInt(userId), userData);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const httpResponse = await userService.deleteUser(parseInt(userId));

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

