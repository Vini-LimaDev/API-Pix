import express, { Request, Response } from 'express';
import autorizacao from '../middleware/autorizacao';
import { buscarTransacao } from '../persistence/repositorioTransacao';
import { processarPagamento } from '../service/servicoPagamento';

const router = express.Router();

// Função auxiliar pra formatar a data bonitinha na resposta
function formatarData(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'America/Sao_Paulo'
  }).format(data);
}

/**
 * GET /pagamento/:id
 * Consulta uma transação pelo ID.
 */
router.get(
  '/pagamento/:id',
  autorizacao,
  async (req: Request, res: Response): Promise<void> => {
    const transacao = await buscarTransacao(req.params.id);
    if (!transacao) {
      res.status(404).json({ erro: 'Transação não encontrada.' });
      return;
    }

    res.json({
      ...transacao,
      criadoEm: formatarData(new Date(transacao.criadoEm))
    });
  }
);

/**
 * POST /pagamento
 * Efetua um pagamento Pix.
 */
router.post(
  '/pagamento',
  autorizacao,
  async (req: Request, res: Response): Promise<void> => {
    const { valor, chavePix, horaSimulada } = req.body as {
      valor?: number;
      chavePix?: string;
      horaSimulada?: number;
    };

    if (!valor || !chavePix) {
      res
        .status(400)
        .json({ erro: 'Dados obrigatórios ausentes: valor ou chavePix.' });
      return;
    }

    try {
      const resultado = await processarPagamento(valor, chavePix, horaSimulada);
      res.json({
        ...resultado,
        criadoEm: formatarData(new Date(resultado.criadoEm))
      });
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  }
);

export default router;
