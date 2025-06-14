import { Request, Response, NextFunction } from 'express';

export default function autorizacao(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer VALID_AUTH_TOKEN') {
    res.status(403).json({ erro: 'Proibido. Token inválido.' });
    return; // apenas encerra a função, não retorna o objeto
  }
  next();
}
