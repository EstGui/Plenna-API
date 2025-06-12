import { ICategory } from "../models/category-model";
import * as categoryRepository from "../repositories/category-repository";
import { noContent, notFound, ok } from "../utils/http-helper"


export const getCategories = async () => {
    const data = await categoryRepository.findAllCategories();
    let response = null;

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}


export const getCategoryById = async (categoryId: number) => {
    const data = await categoryRepository.findCategoryById(categoryId);
    let response = null;

    if (data) response = await ok(data);
    else response = await noContent();

    return response;
}


export const createCategory = async (categoryData: any) => {
    const newCategory = {
        ...categoryData,
        dataCadastro: new Date(),
        dataAtualizacao: new Date()
    };

    await categoryRepository.createCategory(newCategory);

    return ok(newCategory);
}


export const updateCategory = async (categoryId: number, categoryData: any) => {
    const updatedCategory = {
        id: categoryId,
        ...categoryData,
    };

    await categoryRepository.updateCategory(categoryId, updatedCategory);

    return ok(updatedCategory);
}


export const deleteCategory = async (categoryId: number) => {
    const data = await categoryRepository.deleteCategoryById(categoryId);
    let response = await ok(data);

    return response;
}