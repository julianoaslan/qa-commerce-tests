# QA Commerce – Testes de API/WEB (Cypress + Cucumber)

Suite de testes automatizados de API do projeto **QA Commerce** usando **Cypress 13** com **Cucumber (Gherkin)**.  
Os cenários validam **status code** e **regras de negócio** conforme o escopo solicitado na prova técnica.

---

## 🔧 Stack

- **Cypress 13**
- **@badeball/cypress-cucumber-preprocessor** (Gherkin/Steps)
- **esbuild** (preprocessador)
- **Node.js 18+**

---

## 📦 Pré-requisitos

**Aplicação QA Commerce rodando localmente:**

- Repositório: `https://github.com/fabioaraujoqa/qa-commerce`
- Site: `http://localhost:3000`  
- Documentação da API (Swagger): `http://localhost:3000/api-docs`

> Se você está com o monorepo do curso/prova: dentro do projeto da aplicação, rode `npm install` e `npm start` para subir o servidor local.

**Este repositório de testes:**

- Node **18+** instalado  
- Git instalado  
- Editor (ex.: VS Code)

---

## ⚙️ Configuração do projeto

Instale as dependências:
`` npm install ``

▶️ Como executar
Modo interativo (headed)
``npm run cy:open``


Selecione os arquivos .feature desejados.

Modo headless
``npm run cy:run``

Rodar um arquivo específico
``npx cypress run --spec "cypress/e2e/features/api_usuarios.feature"``

---

🧭 Estrutura

<img width="254" height="879" alt="image" src="https://github.com/user-attachments/assets/a50dbec8-1f2c-49fb-9213-9763414f611b" />


      
---

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

---

🧱 Padrões e boas práticas adotadas

Gherkin (Cucumber): cenários legíveis pelo negócio; passos reutilizáveis.

Camada de requests em cypress/support/request/ para isolar HTTP (método/URL/headers) dos passos.

Dados randômicos para criação de usuários (evita colisão de e-mail).

Asserts duplos: status code + regra de negócio (mensagem/estrutura/itens esperados).

Configuração por ambiente (URL base e path) via cypress.env.json ou --env.

---

🧪 Como focar apenas nos testes de API

Execute pelo arquivo .feature (exemplos):

``npx cypress run --spec "cypress/e2e/features/api_usuarios.feature"``
``npx cypress run --spec "cypress/e2e/features/api_produtos.feature"``


Ou abra o runner ``npm run cy:open`` e escolha os specs api_*.

Ou para rodar os testes e gerar o relatório ``npm run test:report``

Entrando no projeto e navegando até a pasta, click no index.html que ele abrirá o relatório

Caminho: cypress/reports/mocha/index.html

<img width="1904" height="987" alt="image" src="https://github.com/user-attachments/assets/9381df1a-cc13-4806-833b-bac94802266d" />



---

🗂️ Git / versionamento

Artefatos gerados (ex.: screenshots), node_modules/ e outros diretórios temporários estão no .gitignore.

---

📚 Sobre a prova técnica

Objetivo: cenários claros em Gherkin, execução autônoma, validação de status e regras de negócio em GET/POST de API, e README com instruções.

Este projeto atende:

Documentação de instalação/execução;

POST/GET de Usuários com regras (mensagens e conteúdo);

Estrutura organizada (features, steps e camada de requests);

Execução local e instruções de override por ambiente.

