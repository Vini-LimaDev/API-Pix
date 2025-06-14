// Lógica de negócio para efetuar pagamento Pix: verifica regras e cria transação
import { criarTransacao, listarTransacoesDoMes } from '../persistence/repositorioTransacao';
import { consultarDadosChavePix } from '../external/chavePixCliente';
import { Transacao } from '../types/Transacao';

/**
 * Processa o pagamento Pix, aplicando as regras de bloqueio:
 *  - Bloqueia se valor > 1000 entre 20h00 e 5h59
 *  - Bloqueia se valor > 15000 entre 6h00 e 19h59
 *  - Bloqueia se somatório mensal exceder 30000
 */
export async function processarPagamento(
  valor: number,
  chavePix: string,
  horaSimulada?: number
): Promise<Transacao> {
  const agora = new Date();
  const hora = horaSimulada !== undefined ? horaSimulada : agora.getHours();
  const horarioNoturno = hora >= 20 || hora < 6;

  // Regra 1: bloqueio por valor/horário
 if (!horarioNoturno && valor > 15000) {
  throw new Error('Transação bloqueada: valor acima de R$ 15.000 permitido apenas das 20h00 às 05h59.');
}
if (horarioNoturno && valor > 1000) {
  throw new Error('Transação bloqueada: valor acima de R$ 1.000 permitido apenas das 06h00 às 19h59.');
}


  // Regra 2: bloqueio pelo limite mensal
  const ano = agora.getUTCFullYear();
  const mes = agora.getUTCMonth();
  const transacoesMes = await listarTransacoesDoMes(ano, mes);
  const soma = transacoesMes.reduce((acc, t) => acc + t.valor, 0) + valor;
  if (soma > 30000) {
    throw new Error('Transação bloqueada: limite mensal de R$ 30.000 excedido.');
  }

  // Consulta dados da conta da chave Pix na API externa
  const { conta, banco } = await consultarDadosChavePix(chavePix);

  // Cria a transação e salva no "banco"
  return await criarTransacao(valor, chavePix, conta, banco);
}
