export interface IPagamento {
    id: number;
    aluguelId: number;
    usuarioId: number;
    dataPagamento: Date;
    valor: number;
    metodoPagamento: 'Cartao de Credito' | 'Boleto' | 'Pix';
    status: 'Pendente' | 'Pago' | 'Cancelado';
}
