# QA Commerce – Testes de API (Cypress + Cucumber)

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

```bash
npm install
