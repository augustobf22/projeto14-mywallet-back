# MyWallet (Back-end)
Aplicação de back-end para o projeto MyWallet. Nesta aplicação, é possível gerenciar o back-end de um pequeno site de administração de transações, como se fosse uma certeira digital, através de requisições HTTP(s) seguindo a convenção REST.

## Demo:
Deploy: https://mywallet-api-7s19.onrender.com/

## Como funciona?
Este projeto é uma API REST para atender a aplicação de uma carteira digital. Ela possui duas entidades: `sessions`, para controle de login, e `transactions`. Foram criadas as seguintes rotas:

- POST `/cadastro`: cria um usuário.
- POST `/`: para fazer o login/signin.
- POST `/nova-transacao/:tipo`: adicionar nova transação, baseada no tipo (pode ser entrada ou saída).
- GET `/home`: lista todas as transações feitas pelo usuário.

Cada uma das rotas contemplam as convenções de respostas para APIs REST.

## Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node
- Express
- MongoDB
- JOI

## Como rodar o projeto em desenvolvimento
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguintes propriedades:
` DATABASE_URL` e `PORT`.
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados e a `PORT` para subir o servidor em uma porta diferente da padrão, que é a `5000`.
- Testes manuais podem ser feitos através do Thunder Client. Na raiz do projeto há uma coleção chamada `thunder-collection-mywallet.json` que pode ser carregada na ferramenta.
- Para testar, basta testar as rotas fornecidas em um cliente do tipo ThunderClient/Postman usando o link do deploy. 
- Após fazer o login, usar o token fornecido no header das outras requisições.