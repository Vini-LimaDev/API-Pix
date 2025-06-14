// Importa a interface da transação
import { Transacao } from '../types/Transacao';

// Mock de dados das transações
let contadorId = 0;
const bancoDeDados: Record<string, Transacao> = {};

// Cria e armazena uma nova transação.
export async function criarTransacao(
  valor: number,
  chavePix: string,
  conta: string,
  banco: string
): Promise<Transacao> {
  const transacao: Transacao = {
    id: (contadorId++).toString(),
    valor,
    chavePix,
    conta,
    banco,
    criadoEm: new Date()
  };
  bancoDeDados[transacao.id] = transacao;
  return transacao;
}

// Busca uma transação pelo ID.
export async function buscarTransacao(id: string): Promise<Transacao | null> {
  return bancoDeDados[id] || null;
}

// Lista todas as transações do mês e ano.
export async function listarTransacoesDoMes(
  ano: number,
  mes: number
): Promise<Transacao[]> {
  return Object.values(bancoDeDados).filter(t => {
    const data = new Date(t.criadoEm);
    return data.getUTCFullYear() === ano && data.getUTCMonth() === mes;
  });
}
