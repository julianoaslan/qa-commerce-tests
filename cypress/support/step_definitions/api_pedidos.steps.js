import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";
import { getPedidosPorUsuario } from "../request/orders.request";

let ordersResponse;
let consultaUserId;

Given("que estou autenticado como admin para consultar pedidos", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  return postLogin(email, password).then((resp) => {
    expect(resp.status).to.eq(200);
    Cypress.env("AUTH_USER_ID", resp.body?.id);
    Cypress.env("AUTH_TOKEN", resp.body?.token); 
  });
});

When("eu consulto os pedidos do usuário autenticado", () => {
  consultaUserId = Cypress.env("AUTH_USER_ID");
  return getPedidosPorUsuario(consultaUserId).then((resp) => {
    ordersResponse = resp;
    cy.log("GET /orders ->", JSON.stringify(resp.body));
  });
});

When("eu consulto os pedidos do usuário {int}", (userId) => {
  consultaUserId = userId;
  return getPedidosPorUsuario(userId).then((resp) => {
    ordersResponse = resp;
    cy.log("GET /orders ->", JSON.stringify(resp.body));
  });
});

Then("o status code de pedidos deve ser {int}", (status) => {
  expect(ordersResponse.status).to.eq(status);
});

Then("a lista de pedidos deve conter pelo menos {int} itens", (min) => {
  expect(ordersResponse.body).to.be.an("array");
  expect(ordersResponse.body.length).to.be.gte(min);
});

Then("cada pedido retornado deve pertencer ao usuário autenticado", () => {
  const body = ordersResponse.body || [];
  const uid = Cypress.env("AUTH_USER_ID");
  body.forEach((order) => {
    expect(order.user_id ?? order.userId).to.eq(uid);
  });
});

Then("a lista de pedidos deve estar vazia", () => {
  expect(ordersResponse.body).to.be.an("array");
  expect(ordersResponse.body.length).to.eq(0);
});
