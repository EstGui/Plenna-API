export interface IRate {
    id: number;
    usuario_id: number;
    livro_id: number;
    nota: number; 
    comentario?: string;
    data_avaliacao: Date;
}
