import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";
import {
  postAdicionarProdutoCarrinho,
  getCarrinhoPorUsuario,
  deleteCarrinhoPorUsuario,
} from "../request/carrinho.request";

let addResponse;       

Given("que estou autenticado como admin para adicionar produtos", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  return postLogin(email, password).then((resp) => {
    expect(resp.status).to.eq(200);

    const token = resp.body?.token;
    const userId = resp.body?.id;

    Cypress.env("AUTH_TOKEN", token);
    Cypress.env("AUTH_USER_ID", userId);

    return deleteCarrinhoPorUsuario(userId);
  });
});

When(
  "eu envio o produto {int} com a quantidade {int} ao carrinho do usuário autenticado",
  (productId, quantity) => {
    const userId = Cypress.env("AUTH_USER_ID");
    return postAdicionarProdutoCarrinho({ userId, productId, quantity }).then((resp) => {
      addResponse = resp;
      cy.log("POST /carrinho (1ª adição) ->", JSON.stringify(resp.body));
    });
  }
);

Then("o status code da resposta de adição deve ser {int}", (statusEsperado) => {
  const aceitaveis = [statusEsperado];
  if (statusEsperado === 201) aceitaveis.push(200);
  expect(aceitaveis, "status aceitos para adição").to.include(addResponse.status);

  if (addResponse.status === 201) {
    expect(addResponse.body).to.have.property("id").and.to.be.a("number");
  }
});

Then('a resposta de adição ao carrinho deve conter a mensagem {string}', (mensagem) => {
  const msg = addResponse.body?.message || addResponse.body?.mensagem || JSON.stringify(addResponse.body);
  expect(msg).to.include(mensagem);
});

Then("ao consultar o carrinho deve existir pelo menos um item", () => {
  const userId = Cypress.env("AUTH_USER_ID");
  return getCarrinhoPorUsuario(userId).then((resp) => {
    cy.log("GET /carrinho ->", JSON.stringify(resp.body));
    expect(resp.status).to.eq(200);
    expect(resp.body).to.be.an("array");
    expect(resp.body.length, "quantidade de itens após adicionar").to.be.gte(1);
  });
});