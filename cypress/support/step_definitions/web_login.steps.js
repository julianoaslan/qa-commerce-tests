import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Header from "../pages/header.page";
import LoginPage from "../pages/login.page";
import Dashboard from "../pages/dashboard.page";

Given("que estou na home", () => {
  Header.openHome();
});

When("acesso a página de login pela navbar", () => {
  Header.goToLogin();

 
  cy.location("pathname").then((path) => {
    if (!path.includes("/dashboard.html")) {
      LoginPage.assertLoaded();
    }
  });
});

When("preencho o formulário de login com o usuário padrão", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  expect(email, "USER_EMAIL não configurado").to.be.a("string").and.not.be.empty;
  expect(password, "USER_PASSWORD não configurado").to.be.a("string").and.not.be.empty;

  LoginPage.fillEmail(email);
  LoginPage.fillPassword(password);
});

When("envio o formulário de login", () => {
  LoginPage.submit();
});

Then('devo ver a área "Minha conta" com a saudação do admin', () => {
  Dashboard.assertDashboardForAdmin();
});

When("informo a senha {string}", (senha) => {
  LoginPage.fillPassword(senha);
});

Then("devo permanecer na página de Login", () => {
  cy.location("pathname", { timeout: 8000 }).should("include", "/login.html");
  LoginPage.assertLoaded();
});

Then("devo ver a mensagem de erro {string}", (mensagem) => {
  LoginPage.assertError(mensagem);
});
