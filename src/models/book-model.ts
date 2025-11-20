export interface IBook {
    id: number;
    titulo: string | null;
    autor: string | null;
    editora: string | null;
    sinopse: string | null;
    capa: string | null;
    disponibilidade: boolean;
    categoria_id: number | null;
    avaliacao_id?: number | null;
}
