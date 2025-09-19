import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getProdutos, getProdutoPorId } from "../request/produtos.request";

let listResponse;
let detailResponse;

Given("que possuo o endpoint de produtos configurado", () => {
});

When(
  "eu consulto a lista de produtos na página {int} com limite {int}",
  (page, limit) => {
    return getProdutos(page, limit).then((resp) => {
      listResponse = resp;
      cy.log("GET /produtos ->", JSON.stringify(resp.body));
    });
  }
);

Then("o status code da lista de produtos deve ser {int}", (status) => {
  expect(listResponse.status).to.eq(status);
});

Then(
  "a resposta de produtos deve conter pelo menos {int} item e a página atual {int}",
  (minQtd, paginaAtual) => {
    const body = listResponse.body || {};
    expect(body).to.have.property("products").and.to.be.an("array");
    expect(body.products.length).to.be.gte(minQtd);

    if (Object.prototype.hasOwnProperty.call(body, "currentPage")) {
      expect(body.currentPage).to.eq(paginaAtual);
    }
  }
);

When("eu consulto o produto {int}", (id) => {
  return getProdutoPorId(id).then((resp) => {
    detailResponse = resp;
    cy.log(`GET /produtos/${id} ->`, JSON.stringify(resp.body));
  });
});

Then("o status code da consulta por produto deve ser {int}", (status) => {
  expect(detailResponse.status).to.eq(status);
});

Then(
  "a resposta de produto deve conter o id {int} e campos básicos",
  (idEsperado) => {
    const b = detailResponse.body || {};
    expect(b).to.have.property("id", idEsperado);
    expect(b).to.have.property("name");
    expect(b).to.have.property("price");
  }
);

Then(
  "a resposta de erro de produto deve mencionar {string}",
  (trecho) => {
    const msg =
      detailResponse.body?.message ||
      detailResponse.body?.mensagem ||
      JSON.stringify(detailResponse.body || {});
    expect(msg.toLowerCase()).to.include(trecho.toLowerCase());
  }
);
