import pool from "../db";
import { IRate } from "../models/rate-model";


export const findAllRates = async (): Promise<IRate[]> => {
    const response = await pool.query(`SELECT * FROM avaliacao`);
    return response.rows || [];
};


export const findRateById = async (id: number): Promise<IRate | null> => {
    const response = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id]);
    return response.rows[0] || null;
};


export const createRate = async (rateData: any): Promise<IRate> => {
    const response = await pool.query(
        `INSERT INTO avaliacao (usuario_id, livro_id, nota, comentario, data_avaliacao) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [
            rateData.usuario_id,
            rateData.livro_id,
            rateData.nota,
            rateData.comentario,
            rateData.data_avaliacao
        ]
    );
    return response.rows[0];
};


export const updateRate = async (id: number, rateData: any): Promise<IRate | null> => {
    const response = await pool.query(
        `UPDATE avaliacao 
         SET usuario_id = $1, livro_id = $2, nota = $3, comentario = $4, data_avaliacao = $5 
         WHERE id = $6 
         RETURNING *`,
        [
            rateData.usuario_id,
            rateData.livro_id,
            rateData.nota,
            rateData.comentario,
            rateData.data_avaliacao,
            id
        ]
    );
    return response.rows[0] || null;
};


export const deleteRateById = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM avaliacao WHERE id = $1`, [id]);
};


export const findRatesByBook = async (bookId: number): Promise<IRate[]> => {
    const response = await pool.query(`SELECT * FROM avaliacao WHERE livro_id = $1`, [bookId]);
    return response.rows || [];
};
