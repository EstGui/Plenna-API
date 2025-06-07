import pool from "../db";
import { ICategory } from "../models/category-model";


export const findAllCategories = async (): Promise<ICategory[]> => {
    const response = await pool.query(`SELECT * FROM Categoria`);
    const categories = response.rows as ICategory[];
    return categories || [];
};


export const findCategoryById = async (id: number): Promise<ICategory | null> => {
    const response = await pool.query(`SELECT * FROM Categoria WHERE id = $1`, [id]);
    const category = response.rows[0] as ICategory;
    return category || null;
};


export const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
    const response = await pool.query(
        `INSERT INTO Categoria (nome, descricao) 
         VALUES ($1, $2) 
         RETURNING *`,
        [categoryData.nome, categoryData.descricao]
    );
    return response.rows[0] as ICategory;
};


export const updateCategory = async (id: number, categoryData: ICategory): Promise<ICategory | null> => {
    const response = await pool.query(
        `UPDATE Categoria 
         SET nome = $1, descricao = $2 
         WHERE id = $3 
         RETURNING *`,
        [categoryData.nome, categoryData.descricao, id]
    );
    return response.rows[0] as ICategory || null;
};


export const deleteCategoryById = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM Categoria WHERE id = $1`, [id]);
};
