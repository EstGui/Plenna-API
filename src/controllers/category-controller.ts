import { Request, Response } from 'express';
import * as categoryService from '../services/category-service';


export const getCategories = async (req: Request, res: Response) => {
    const httpResponse = await categoryService.getCategories();

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const httpResponse = await categoryService.getCategoryById(parseInt(categoryId));

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const createCategory = async (req: Request, res: Response) => {
    const categoryData = req.body;
    const httpResponse = await categoryService.createCategory(categoryData);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const updateCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const httpResponse = await categoryService.updateCategory(parseInt(categoryId), categoryData);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}


export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const httpResponse = await categoryService.deleteCategory(parseInt(categoryId));

    res.status(httpResponse.statusCode).json(httpResponse.body);
}