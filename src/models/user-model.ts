export interface IUser {
    id: number;
    nome: string | null;
    email: string;
    senha: string;
    endereco: string | null;
    telefone: string | null;
    dataCadastro: Date;
    dataAtualizacao: Date;
}
