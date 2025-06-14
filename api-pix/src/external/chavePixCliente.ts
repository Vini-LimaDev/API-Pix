// Define o tipo esperado da resposta da API externa
import fetch from 'node-fetch';
export interface DadosPix {
  conta: string;
  banco: string;
}

// Consulta os dados da conta a partir da chave Pix na API
export async function consultarDadosChavePix(chavePix: string): Promise<DadosPix> {
  const resposta = await fetch(`http://localhost:3001/pixKey/${chavePix}`);
  if (!resposta.ok) throw new Error('Chave Pix não encontrada na API externa.');
  return resposta.json() as Promise<DadosPix>;
}
