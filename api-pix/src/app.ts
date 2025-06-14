import express from 'express';
import rotasPagamento from './presentation/rotasPagamento';

const app = express();

app.use(express.json());
app.use('/', rotasPagamento);

app.listen(3000, () => console.log('API rodando na porta 3000'));
