QA Commerce – Testes de API (Cypress + Cucumber)

Suite de testes automatizados de API do projeto QA Commerce usando Cypress 13 com Cucumber (Gherkin).
Os cenários validam status code e regras de negócio conforme o escopo solicitado na prova técnica.

🔧 Stack

Cypress 13

@badeball/cypress-cucumber-preprocessor (Gherkin/Steps)

esbuild (preprocessador)

Node.js 18+

📦 Pré-requisitos

Aplicação QA Commerce rodando localmente:

Site: http://localhost:3000

Documentação da API (Swagger): http://localhost:3000/api-docs

Se você está com o monorepo do curso/prova: dentro do projeto da aplicação, rode npm install e npm start para subir o servidor local.

Este repositório de testes:

Node 18+ instalado

Git instalado

Editor (ex.: VS Code)

⚙️ Configuração do projeto

Instale as dependências:

npm install

Variáveis de ambiente

Edite o arquivo cypress.env.json (já incluso) conforme seu ambiente:

{
  "API_BASE_URL": "http://localhost:3000",
  "API_BASE_PATH": "/api",
  "USER_NAME": "Admin",
  "USER_EMAIL": "admin@admin.com",
  "USER_PASSWORD": "admin"
}


API_BASE_URL + API_BASE_PATH: constroem a URL base das requisições.

USER_EMAIL / USER_PASSWORD: credenciais do admin para cenários que precisam autenticação (login).

Você pode sobrescrever pela CLI:
npx cypress run --env API_BASE_URL=https://minha-api,API_BASE_PATH=/v1

▶️ Como executar
Modo interativo (headed)
npm run cy:open


Selecione os arquivos .feature desejados.

Modo headless
npm run cy:run

Rodar um arquivo específico
npx cypress run --spec "cypress/e2e/features/api_usuarios.feature"

🧭 Estrutura
cypress/
  e2e/
    features/                  # Arquivos .feature (Gherkin)
      api_carrinho.feature
      api_carrinho_adicionar.feature
      api_carrinho_remover.feature
      api_checkout.feature
      api_login.feature
      api_pedidos.feature
      api_produtos.feature
      api_produtos_detalhe.feature
      api_usuarios.feature     # >>> foco do POST/GET de usuários
  support/
    e2e.js
    step_definitions/          # Steps dos cenários
      *.steps.js
    request/                   # Camada de requests (reutilizável nos steps)
      carrinho.request.js
      checkout.request.js
      login.request.js
      orders.request.js
      products.request.js
      users.request.js

✅ Escopo coberto (API)

A prova técnica pede que a automação inclua pelo menos um GET e um POST com validação de status e regra de negócio.
Este repositório cobre isso e inclui cenários extras úteis ao fluxo da aplicação.

Usuários (api_usuarios.feature)

POST /users – cria usuário aleatório (nome/e-mail únicos).
Valida 201 e mensagem: “Usuário criado com sucesso.”

GET /users – lista todos e confere se o e-mail criado está presente.

POST /users (duplicado) – tenta criar o mesmo e-mail e espera 400 com mensagem: “Email já cadastrado.”

Obs.: endpoints que exigem autenticação (PUT/DELETE) foram deixados fora do escopo para simplificar, já que o Swagger da aplicação exige token via header e pode variar por ambiente.

Outros endpoints (amostras incluídas)

Produtos – listagem com paginação e detalhe por ID.

Carrinho – adicionar e remover item.

Checkout – finalizar pedido (inclui cenários de sucesso e validação).

Pedidos – listar pedidos de um usuário.

Login – autenticação para cenários que precisam token.

🧱 Padrões e boas práticas adotadas

Gherkin (Cucumber): cenários legíveis pelo negócio; passos reutilizáveis.

Camada de requests em cypress/support/request/ para isolar HTTP (método/URL/headers) dos passos.

Dados randômicos para criação de usuários (evita colisão de e-mail).

Asserts duplos: status code + regra de negócio (mensagem/estrutura/itens esperados).

Configuração por ambiente (URL base e path) via cypress.env.json ou --env.

🧯 Troubleshooting

403/401 Unauthorized
Confirme se a aplicação está rodando e, quando necessário, se o header Authorization está sendo enviado. Os steps de login salvam o token no Cypress.env("AUTH_TOKEN") para requests protegidos.

400 Email já cadastrado
O cenário de duplicidade espera esse 400; para criação “feliz”, os testes geram um e-mail aleatório.

Falhas por URL base
Ajuste API_BASE_URL/API_BASE_PATH no cypress.env.json ou passe pela CLI.

🧪 Como focar apenas nos testes de API

Execute pelo arquivo .feature (exemplos):

npx cypress run --spec "cypress/e2e/features/api_usuarios.feature"
npx cypress run --spec "cypress/e2e/features/api_produtos.feature"


Ou abra o runner npm run cy:open e escolha os specs api_*.

🗂️ Git / versionamento

Artefatos gerados (ex.: screenshots), node_modules/ e outros diretórios temporários estão no .gitignore.

📚 Sobre a prova técnica

Objetivo: cenários claros em Gherkin, execução autônoma, validação de status e regras de negócio em GET/POST de API, e README com instruções.

Este projeto atende:

Documentação de instalação/execução;

POST/GET de Usuários com regras (mensagens e conteúdo);

Estrutura organizada (features, steps e camada de requests);

Execução local e instruções de override por ambiente.
