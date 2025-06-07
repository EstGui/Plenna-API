export interface IAluguel {
    id: number;
    usuarioId: number;
    livroId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date | null;
    dataDevolucaoReal: Date | null;
    status: 'Pendente' | 'Aprovado' | 'Devolvido' | 'Atrasado';
}
