// Cliente para consultar dados de uma chave Pix no mock

// Função que retorna fetch (Node 18 já tem global fetch)
async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch;
  const mod = await import('node-fetch');
  return mod.default;
}

export interface DadosChavePix {
  conta: string;
  banco: string;
}

// BASE_URL pode ser sobrescrito por env MOCK_PIX_BASE_URL
const BASE_URL = process.env.MOCK_PIX_BASE_URL || 'http://localhost:3001';

export async function consultarDadosChavePix(chavePix: string): Promise<DadosChavePix> {
  const fetch = await getFetch();
  const url = `${BASE_URL}/pixKey/${encodeURIComponent(chavePix)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erro na consulta da chave: ${res.status}`);
  }
  return res.json();
}