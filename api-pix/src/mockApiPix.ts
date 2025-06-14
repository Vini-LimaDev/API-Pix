import express, { Request, Response } from 'express';

const app = express();

app.get('/pixKey/:chavePix', (req: Request, res: Response) => {
  res.json({
    conta: '12345-6',
    banco: 'Banco de Exemplo'
  });
});

app.listen(3001, () => console.log('Mock da API Pix rodando na porta 3001'));
