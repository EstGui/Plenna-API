import pool from "../db";
import { IBook } from "../models/book-model";

export const findAllBooks = async (): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros`);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBookById = async (id: number): Promise<IBook | null> => {
    const response = await pool.query(`SELECT * FROM livros WHERE id = $1`, [id]);
    const book = response.rows[0] as IBook;
    return book || null;
};

export const createBook = async (bookData: IBook): Promise<IBook> => {
    const response = await pool.query(
        `INSERT INTO livros (titulo, autor, editora, sinopse, capa, disponibilidade, categoria_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [
            bookData.titulo,
            bookData.autor,
            bookData.editora,
            bookData.sinopse,
            bookData.capa,
            bookData.disponibilidade,
            bookData.categoria_id,
        ]
    );
    return response.rows[0] as IBook;
};

export const updateBook = async (id: number, bookData: IBook): Promise<IBook | null> => {
    const response = await pool.query(
        `UPDATE livros 
         SET titulo = $1, autor = $2, editora = $3, sinopse = $4, capa = $5, disponibilidade = $6, categoria_id = $7, avaliacao_id = $8 
         WHERE id = $9 
         RETURNING *`,
        [
            bookData.titulo,
            bookData.autor,
            bookData.editora,
            bookData.sinopse,
            bookData.capa,
            bookData.disponibilidade,
            bookData.categoria_id,
            bookData.avaliacao_id,
            id
        ]
    );
    return response.rows[0] as IBook || null;
};

export const deleteBook = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM livros WHERE id = $1`, [id]);
};

export const findBooksByCategory = async (category_id: number): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros WHERE categoria_id = $1`, [category_id]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByAuthor = async (author: string): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros WHERE autor ILIKE $1`, [`%${author}%`]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByTitle = async (title: string): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros WHERE titulo ILIKE $1`, [`%${title}%`]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByAvailability = async (isAvailable: boolean): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros WHERE disponibilidade = $1`, [isAvailable]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByUser = async (userId: number): Promise<IBook[]> => {
    const response = await pool.query(
        `SELECT l.* FROM livros l 
         JOIN Emprestimo e ON l.id = e.livros_id 
         WHERE e.usuario_id = $1`, 
        [userId]
    );
    const books = response.rows as IBook[];
    return books || [];
}

export const findAvailableBooks = async (): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM livros WHERE disponibilidade = true`);
    const books = response.rows as IBook[];
    return books || [];
}
