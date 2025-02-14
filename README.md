
# IDP-CLIENT Frontend

  

Esta é a aplicação frontend do IDP-CLIENT, construída com React e Material UI. Ela é responsável por interagir com o IDP Server local (rodando em [https://localhost:7019](https://localhost:7019)) para:

- Carregar a lista de clientes registrados no IDP.

- Registrar novos clientes no IDP através de um formulário.

## Como Executar

  

### Pré-requisitos

 

- [Node.js](https://nodejs.org/)

- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

  

### Instalação

  

1.  **Clone o repositório:**

  

```bash

git clone <URL_DO_REPOSITORIO>

cd idp-client

```

2.  **Instale as dependências:**

  

```bash

yarn install

```

### Executando a Aplicação

  

Para iniciar o servidor de desenvolvimento, execute:

  

```bash

yarn  start

```

A aplicação será iniciada em http://localhost:3000.

  

### Como Funciona

• **Carregamento de Clientes:**

Ao carregar, a aplicação faz uma requisição GET para o endpoint de listagem de clientes no IDP, que está rodando localmente em https://localhost:7019. Os clientes registrados são exibidos em uma tabela.

• **Registro de Novos Clientes:**

Um formulário permite inserir os dados para registro de um novo cliente, contendo:

• **ClientId:** Identificador único do cliente.

• **ClientSecret:** Segredo do cliente (gerado como GUID em maiúsculas e não editável).

• **ClientName:** Nome amigável da aplicação (exibido nos dashboards).

Ao clicar no botão “Registrar Cliente”, uma requisição POST é enviada para https://localhost:7019/connect/register com os dados informados.

• **Ambiente Local:**

Todas as chamadas estão configuradas para apontar para o ambiente local, com o IDP Server rodando em https://localhost:7019.

  

#### Links Úteis

• IDP Server (POC em .NET): https://github.com/willianrattis/poc-idp-server

  

• Endpoints do IDP:

• Registro de Cliente:

  

```bash

curl  --location  'https://localhost:7019/connect/register'  \

--header  'Content-Type: application/json'  \

--data  '{

"clientId": "service-2",

"clientSecret": "067cbc02-b3c2-4424-af47-ed75ec946777",

"clientName": "Nome do Cliente"

}'

```

  

• Consulta de Clientes:

```bash

curl --location 'https://localhost:7019/connect/register'

```

### Tecnologias Utilizadas

  

• React

• Material UI

• Axios (para chamadas de API)

• Yarn

  

### Considerações

• Ambiente Didático:

Este projeto foi desenvolvido para fins didáticos. A aplicação frontend interage com o IDP Server local para demonstrar a criação e consulta de clientes.

• CORS:

O IDP Server está configurado para aceitar requisições de qualquer origem, permitindo a comunicação com o frontend rodando em http://localhost:3000.

  

### License

  

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.