import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";
import { getCarrinhoPorUsuario, deleteCarrinhoPorUsuario } from "../request/carrinho.request";

let deleteResponse;

Given("que estou autenticado como admin para limpar o carrinho", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  return postLogin(email, password).then((resp) => {
    expect(resp.status).to.eq(200);

    const token = resp.body?.token; 
    const userId = resp.body?.id;

    expect(token).to.be.a("string").and.not.empty;
    expect(userId).to.be.a("number");

    Cypress.env("AUTH_TOKEN", token);
    Cypress.env("AUTH_USER_ID", userId);
  });
});

When("eu removo todos os itens do carrinho do usuário autenticado", () => {
  const userId = Cypress.env("AUTH_USER_ID");
  return deleteCarrinhoPorUsuario(userId).then((resp) => {
    deleteResponse = resp;
  });
});

Then("o status code da remoção do carrinho deve ser {int}", (status) => {
  expect(deleteResponse.status).to.eq(status);
});

Then('a resposta de remoção deve conter a mensagem {string}', (mensagem) => {
  const msg = deleteResponse.body?.message || deleteResponse.body?.mensagem || JSON.stringify(deleteResponse.body);
  expect(msg).to.include(mensagem);
});

Then("ao consultar o carrinho novamente ele deve estar vazio", () => {
  const userId = Cypress.env("AUTH_USER_ID");
  return getCarrinhoPorUsuario(userId).then((resp) => {
    expect(resp.status).to.eq(200);
    expect(resp.body).to.be.an("array");
    expect(resp.body.length).to.eq(0);
  });
});
