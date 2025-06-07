import pool from "../db";
import { IBook } from "../models/book-model";

export const findAllBooks = async (): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM Livro`);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBookById = async (id: number): Promise<IBook | null> => {
    const response = await pool.query(`SELECT * FROM Livro WHERE id = $1`, [id]);
    const book = response.rows[0] as IBook;
    return book || null;
};

export const createBook = async (bookData: IBook): Promise<IBook> => {
    const response = await pool.query(
        `INSERT INTO Livro (titulo, autor, isbn, editora, data_publicacao, numero_paginas, idioma, sinopse, capa, disponibilidade, preco, categoria_id, avaliacao_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
         RETURNING *`,
        [
            bookData.titulo,
            bookData.autor,
            bookData.isbn,
            bookData.editora,
            bookData.data_publicacao,
            bookData.numero_paginas,
            bookData.idioma,
            bookData.sinopse,
            bookData.capa,
            bookData.disponibilidade,
            bookData.preco,
            bookData.categoria_id,
            bookData.avaliacao_id
        ]
    );
    return response.rows[0] as IBook;
};

export const updateBook = async (id: number, bookData: IBook): Promise<IBook | null> => {
    const response = await pool.query(
        `UPDATE Livro 
         SET titulo = $1, autor = $2, isbn = $3, editora = $4, data_publicacao = $5, numero_paginas = $6, idioma = $7, sinopse = $8, capa = $9, disponibilidade = $10, preco = $11, categoria_id = $12, avaliacao_id = $13 
         WHERE id = $14 
         RETURNING *`,
        [
            bookData.titulo,
            bookData.autor,
            bookData.isbn,
            bookData.editora,
            bookData.data_publicacao,
            bookData.numero_paginas,
            bookData.idioma,
            bookData.sinopse,
            bookData.capa,
            bookData.disponibilidade,
            bookData.preco,
            bookData.categoria_id,
            bookData.avaliacao_id,
            id
        ]
    );
    return response.rows[0] as IBook || null;
};

export const deleteBookById = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM Livro WHERE id = $1`, [id]);
};

export const findBooksByCategory = async (category_id: number): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM Livro WHERE categoria_id = $1`, [category_id]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByAuthor = async (author: string): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM Livro WHERE autor ILIKE $1`, [`%${author}%`]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByTitle = async (title: string): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM Livro WHERE titulo ILIKE $1`, [`%${title}%`]);
    const books = response.rows as IBook[];
    return books || [];
};

export const findBooksByAvailability = async (isAvailable: boolean): Promise<IBook[]> => {
    const response = await pool.query(`SELECT * FROM Livro WHERE disponibilidade = $1`, [isAvailable]);
    const books = response.rows as IBook[];
    return books || [];
};
