export interface Transacao {
  id: string;
  valor: number;
  chavePix: string;
  conta: string;
  banco: string;
  criadoEm: Date;
}