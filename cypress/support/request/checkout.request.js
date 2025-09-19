const joinUrl = (a, b) => a.replace(/\/+$/, "") + "/" + b.replace(/^\/+/, "");
const baseUrl = () => Cypress.env("API_BASE_URL") || "http://localhost:3000";
const basePath = () => (Cypress.env("API_BASE_PATH") || "api").replace(/\/+$/, "");
const makeUrl = (path) => joinUrl(joinUrl(baseUrl(), basePath()), path);

export const postCheckout = (payload) => {
  const url = makeUrl("checkout");

  const token = Cypress.env("AUTH_TOKEN");
  const headers = token ? { Authorization: token } : {};

  return cy.request({
    method: "POST",
    url,
    headers,
    body: payload,
    failOnStatusCode: false, 
  });
};
