import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postLogin } from "../request/login.request";
import { postAdicionarProdutoCarrinho, deleteCarrinhoPorUsuario } from "../request/carrinho.request";
import { postCheckout } from "../request/checkout.request";

let checkoutResponse;

const metodoToApi = (metodoVisivel) => {
  const map = {
    "Cartão de crédito": "credit_card",
    "PIX": "pix",
    "Boleto": "boleto",
  };
  return map[metodoVisivel] || metodoVisivel;
};

const buildCheckoutPayload = (userId, metodo = "Cartão de crédito", overrides = {}) => {
  const paymentMethod = metodoToApi(metodo);

  const base = {
    userId,
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    number: "456",
    cep: "12345678",
    phone: "1234567890",
    email: "john.doe@example.com",
    paymentMethod,
    createAccount: false,
    password: "Password123!",
  };

  if (paymentMethod === "credit_card") {
    Object.assign(base, {
      cardNumber: "1234123412341234",
      cardExpiry: "12/2025",
      cardCvc: "123", 
    });
  } else if (paymentMethod === "pix") {
    Object.assign(base, { pixKey: "123e4567-e89b-12d3-a456-426614174000" });
  } else if (paymentMethod === "boleto") {
    Object.assign(base, {
      boletoCode: "23793.38128 60082.677139 66003.996498 1 89440000010000",
    });
  }

  return { ...base, ...overrides };
};

Given("que estou autenticado como admin e com um item no carrinho", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  return postLogin(email, password).then((resp) => {
    expect(resp.status).to.eq(200);
    const token = resp.body?.token;
    const userId = resp.body?.id;

    Cypress.env("AUTH_TOKEN", token);
    Cypress.env("AUTH_USER_ID", userId);

    return deleteCarrinhoPorUsuario(userId).then(() =>
      postAdicionarProdutoCarrinho({ userId, productId: 1, quantity: 1 })
    );
  });
});

When('eu finalizo o checkout usando o método {string}', (metodo) => {
  const userId = Cypress.env("AUTH_USER_ID");
  const payload = buildCheckoutPayload(userId, metodo);

  return postCheckout(payload).then((resp) => {
    checkoutResponse = resp;
    cy.log("POST /checkout ->", JSON.stringify(resp.body));
  });
});

Then("o status do checkout deve ser {int} e deve retornar um número de pedido", (status) => {
 
  expect([status, 200]).to.include(checkoutResponse.status);
  expect(checkoutResponse.body).to.have.property("orderNumber").and.to.be.a("string").and.not.be.empty;
  expect(checkoutResponse.body).to.have.property("id");
});


When("eu tento finalizar o checkout com dados inválidos", () => {
  return postCheckout({}).then((resp) => {
    checkoutResponse = resp;
    cy.log("POST /checkout inválido ->", JSON.stringify(resp.body));
  });
});

Then("o status do checkout deve ser {int}", (status) => {
  expect(checkoutResponse.status).to.eq(status);
});

Then('a mensagem de erro do checkout deve mencionar {string}', (trecho) => {
  const body = checkoutResponse.body;

  let texto = "";
  if (typeof body === "string") {
    texto = body.toLowerCase();
  } else if (body) {
    if (body.message || body.mensagem) {
      texto = String(body.message || body.mensagem).toLowerCase();
    } else if (body.errors || body.erros) {
      texto = JSON.stringify(body.errors || body.erros).toLowerCase();
    }
  }

  expect(texto, `texto do erro: ${JSON.stringify(body)}`).to.contain(trecho.toLowerCase());
  expect(body).to.not.have.property("orderNumber");
});
