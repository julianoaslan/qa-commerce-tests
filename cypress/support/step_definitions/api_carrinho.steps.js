import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";
import { getCarrinhoPorUsuario } from "../request/carrinho.request";

let cartResponse;

Given("que estou autenticado como admin", () => {
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

When("eu consulto o carrinho do usuário autenticado", () => {
  const userId = Cypress.env("AUTH_USER_ID");
  return getCarrinhoPorUsuario(userId).then((resp) => {
    cartResponse = resp;
  });
});

Then("o status code do carrinho deve ser {int}", (status) => {
  expect(cartResponse.status).to.eq(status);
});

Then("a resposta do carrinho deve ter um formato válido", () => {
  const body = cartResponse.body;

  expect(body, "corpo do carrinho").to.be.an("array");
  expect(body.length).to.be.gte(0);
});
