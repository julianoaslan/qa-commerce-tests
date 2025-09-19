import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";

let response;
let credentials = {};

Given("que possuo credenciais válidas", () => {
  credentials = {
    email: Cypress.env("USER_EMAIL"),
    password: Cypress.env("USER_PASSWORD"),
  };
});

Given("que possuo um email válido e uma senha inválida", () => {
  credentials = {
    email: Cypress.env("USER_EMAIL"),
    password: "senha_invalida_123",
  };
});

When("eu autentico na API de login", () => {
  return postLogin(credentials.email, credentials.password).then((resp) => {
    response = resp;
    if (resp.status === 200 && resp.body?.token) {
      Cypress.env("AUTH_TOKEN", resp.body.token);
    }
  });
});

Then("o status code deve ser {int}", (status) => {
  expect(response.status).to.eq(status);
});

Then("a resposta deve conter um token JWT", () => {
  expect(response.body).to.have.property("token").and.to.be.a("string").and.not.empty;
});

Then('a resposta deve conter a mensagem {string}', (msg) => {
  const body = response.body || {};
  const message = body.message || body.error || body.detail || JSON.stringify(body);
  expect(message).to.include(msg);
});
