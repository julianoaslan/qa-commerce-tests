import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getProdutoPorId } from "../request/produtos.request";

let detalheResp;

Given("que a API de produtos está disponível", () => {
  cy.wrap(null);
});

When("eu consulto o produto de id {int}", (id) => {
  return getProdutoPorId(id).then((resp) => {
    detalheResp = resp;
    cy.log("GET /produtos/{id} ->", JSON.stringify(resp.body));
  });
});

Then("o status code de detalhes deve ser {int}", (status) => {
  expect(detalheResp.status).to.eq(status);
});

Then("o corpo deve conter o id {int}, nome, preço e imagem válidos", (idEsperado) => {
  const b = detalheResp.body;

  expect(b).to.have.property("id", idEsperado);

  expect(b).to.have.property("name")
    .and.to.be.a("string")
    .and.to.have.length.greaterThan(0);

  expect(b).to.have.property("price");
  expect(b.price).to.be.a("number").and.to.be.greaterThan(0);

  expect(b).to.have.property("image")
    .and.to.be.a("string")
    .and.to.include("images/produtos/");
});
