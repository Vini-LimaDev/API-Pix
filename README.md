# 💸 API Pix — Simulador de Pagamentos Instantâneos

Uma API desenvolvida em **Node.js + TypeScript + Express** que simula o processamento de **pagamentos Pix**, aplicando regras reais de **bloqueio por valor, horário e limite mensal**.  
O projeto também inclui uma **API externa mockada** para validação de chaves Pix.

---

## 🚀 Tecnologias Utilizadas

🟢 **Node.js** — Ambiente de execução JavaScript  
🔵 **TypeScript** — Tipagem estática e modularização  
🟣 **Express.js** — Framework para rotas e middlewares  
🟠 **node-fetch** — Comunicação HTTP com API externa mockada  
🧩 **Arquitetura em camadas** — External • Middleware • Persistence • Service • Presentation  

---

## 🧱 Estrutura do Projeto

```bash
📦 api-pix
 ┣ 📂 src
 ┃ ┣ 📂 external
 ┃ ┃ ┗ 📜 chavePixCliente.ts        # Consulta dados bancários via API externa (mock)
 ┃ ┣ 📂 middleware
 ┃ ┃ ┗ 📜 autorizacao.ts            # Middleware de autenticação por Bearer Token (VALID_AUTH_TOKEN)
 ┃ ┣ 📂 persistence
 ┃ ┃ ┗ 📜 repositorioTransacao.ts   # “Banco de dados” em memória
 ┃ ┣ 📂 presentation
 ┃ ┃ ┗ 📜 rotasPagamento.ts         # Rotas REST da API
 ┃ ┣ 📂 service
 ┃ ┃ ┗ 📜 servicoPagamento.ts       # Regras de negócio e processamento de Pix
 ┃ ┣ 📂 types
 ┃ ┃ ┗ 📜 Transacao.ts              # Interface tipada da transação
 ┃ ┣ 📜 app.ts                      # Inicialização da API principal (porta 3000)
 ┃ ┗ 📜 mockApiPix.ts               # Mock da API de chaves Pix (porta 3001)
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 .gitignore
```
---

## ⚙️ Como testar a API (Postman)
- Antes de tudo, rodar um _npm install_ no console para instalar o necessário para rodar o projeto

- Definir o 'type' e o token em **Authorization**
  - Type: Bearer Token
  - Token: VALID_AUTH_TOKEN

- Em **Headers**:
  - Key: Authorization  
  - Value: VALID_AUTH_TOKEN

- Em Body, vamos selecionar o formato "Raw" e o tipo será JSON. E terá o formato igual ao modelo abaixo:
  
  ```bash
    {
      "valor": 10000,
      "chavePix": "chave",
      "horaSimulada": 10
    }
  ```

- Quando for definir o método (POST ou GET), o endereço para a requisição é: http://localhost:3000/pagamento.
   - Para o método GET, DEVE usar o índice da transação no final do endereço (exemplo com o indice 9: http://localhost:3000/pagamento/9)
