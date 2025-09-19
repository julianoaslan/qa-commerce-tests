import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { postCreateUser, getUsers } from "../request/users.request";

let userData;        
let createResp;      
let dupCreateResp;   
let listResp;        

const randomUser = () => {
  const stamp = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: `QA_User_${stamp}`,
    email: `qa_${stamp}@commerce.com`,
    password: "Password123!",
    isAdmin: false,
  };
};

Given("que tenho um usuário aleatório para cadastro", () => {
  userData = randomUser();
  cy.log("Usuário aleatório:", JSON.stringify(userData));
});

Given("que eu já criei esse usuário com sucesso", () => {
  return postCreateUser(userData).then((resp) => {
    createResp = resp;
    expect([200, 201]).to.include(resp.status);
    const msg =
      resp.body?.message ||
      resp.body?.mensagem ||
      (typeof resp.body === "string" ? resp.body : JSON.stringify(resp.body));
    expect(msg).to.include("Usuário criado com sucesso.");
  });
});

When("eu crio esse usuário", () => {
  return postCreateUser(userData).then((resp) => {
    createResp = resp;
    cy.log("POST /users ->", JSON.stringify(resp.body));
  });
});

When("eu listar os usuários", () => {
  return getUsers().then((resp) => {
    listResp = resp;
    cy.log("GET /users ->", JSON.stringify(resp.body));
  });
});

When("eu tento criar novamente o mesmo usuário", () => {
  return postCreateUser(userData).then((resp) => {
    dupCreateResp = resp;
    cy.log("POST /users (duplicado) ->", JSON.stringify(resp.body));
  });
});

Then("o status da criação de usuário deve ser {int}", (statusEsperado) => {
  const aceitos = [statusEsperado];
  if (statusEsperado === 201) aceitos.push(200);
  expect(aceitos, "status aceitos para criação").to.include(createResp.status);
});

Then("o status da listagem de usuários deve ser {int}", (status) => {
  expect(listResp.status).to.eq(status);
});

Then("o status da criação duplicada deve ser {int}", (status) => {
  expect(dupCreateResp.status).to.eq(status);
});

Then("a resposta de criação deve conter a mensagem {string}", (mensagem) => {
  const msg =
    createResp.body?.message ||
    createResp.body?.mensagem ||
    (typeof createResp.body === "string" ? createResp.body : JSON.stringify(createResp.body));
  expect(msg).to.include(mensagem);
});

Then("a resposta de erro da criação duplicada deve conter a mensagem {string}", (mensagem) => {
  const msg =
    dupCreateResp.body?.message ||
    dupCreateResp.body?.mensagem ||
    (typeof dupCreateResp.body === "string" ? dupCreateResp.body : JSON.stringify(dupCreateResp.body));
  expect(msg).to.include(mensagem);
});

Then("a lista de usuários deve conter o e-mail do usuário gerado", () => {
  expect(listResp.body, "corpo da listagem deve ser array").to.be.an("array");
  const found = listResp.body.some((u) => u?.email === userData.email);
  expect(found, `esperava encontrar ${userData.email} na listagem`).to.be.true;
});
