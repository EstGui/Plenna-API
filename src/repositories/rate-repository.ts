import pool from "../db";
import { IRate } from "../models/rate-model";


export const findAllRates = async (): Promise<IRate[]> => {
    const response = await pool.query(`SELECT * FROM avaliacoes`);
    return response.rows || [];
};


export const findRateById = async (id: number): Promise<IRate | null> => {
    const response = await pool.query(`SELECT * FROM avaliacoes WHERE id = $1`, [id]);
    return response.rows[0] || null;
};


export const createRate = async (rateData: any): Promise<IRate> => {
    const response = await pool.query(
        `INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario, data_avaliacao) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
            rateData.usuario_id,
            rateData.livro_id,
            rateData.nota,
            rateData.comentario,
            rateData.data_avaliacoes
        ]
    );
    return response.rows[0];
};


export const updateRate = async (id: number, rateData: any): Promise<IRate | null> => {
    const response = await pool.query(
        `UPDATE avaliacoes 
         SET usuario_id = $1, livro_id = $2, nota = $3, comentario = $4, data_avaliacao = NOW()
         WHERE id = $6 
         RETURNING *`,
        [
            rateData.usuario_id,
            rateData.livro_id,
            rateData.nota,
            rateData.comentario,
            rateData.data_avaliacoes,
            id
        ]
    );
    return response.rows[0] || null;
};


export const deleteRateById = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM avaliacoes WHERE id = $1`, [id]);
};


export const findRatesByBook = async (bookId: number): Promise<IRate[]> => {
    const response = await pool.query(`SELECT * FROM avaliacoes WHERE livro_id = $1`, [bookId]);
    return response.rows || [];
};
