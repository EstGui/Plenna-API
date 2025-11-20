import pool from "../db";
import { IUser } from "../models/user-model";


export const findAllUsers = async (): Promise<IUser[]> => {
    const response = await pool.query(`SELECT * FROM usuarios`);

    const users = response.rows as IUser[];

    return users || [];
}


export const findUserById = async (id: number): Promise<IUser | null> => {
    const response = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);

    const user = response.rows[0] as IUser;

    return user || null;
}


export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const response = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

    const user = response.rows[0] as IUser;

    return user || null;
}


export const createUser = async (userData: IUser): Promise<IUser> => {
    const response = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, endereco, telefone, data_cadastro, data_atualizacao) 
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
        RETURNING *`,
        [userData.nome, userData.email, userData.senha, userData.endereco, userData.telefone]
    );

    return response.rows[0] as IUser;
}


export const updateUser = async (id: number, userData: IUser): Promise<IUser | null> => {
    const response = await pool.query(
        `UPDATE usuarios 
        SET nome = $1, email = $2, senha = $3, endereco = $4, telefone = $5, data_atualizacao = NOW() 
        WHERE id = $6 
        RETURNING *`,
        [userData.nome, userData.email, userData.senha, userData.endereco, userData.telefone, id]
    );

    return response.rows[0] as IUser || null;
}


export const deleteUser = async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
}
