const joinUrl = (a, b) => a.replace(/\/+$/, "") + "/" + b.replace(/^\/+/, "");
const baseUrl = () => Cypress.env("API_BASE_URL") || "http://localhost:3000";
const basePath = () => (Cypress.env("API_BASE_PATH") || "").replace(/\/+$/, "");
const makeUrl = (path) => {
  const root = baseUrl();
  const bp = basePath();
  const full = bp ? joinUrl(root, bp) : root;
  return joinUrl(full, path);
};

export const getPedidosPorUsuario = (userId) => {
  const url = makeUrl(`orders?userId=${userId}`);
  return cy.request({
    method: "GET",
    url,
    failOnStatusCode: false,
  });
};
