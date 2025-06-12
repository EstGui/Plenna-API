export interface IBook {
    id: number;
    titulo: string | null;
    autor: string | null;
    isbn: string | null;
    editora: string | null;
    data_publicacao: Date | null;
    numero_paginas: number | null;
    idioma: string | null;
    sinopse: string | null;
    capa: string | null;
    disponibilidade: boolean;
    preco: number | null;
    categoria_id: number | null;
    avaliacao_id?: number | null;
}
