const joinUrl = (a, b) => a.replace(/\/+$/, "") + "/" + b.replace(/^\/+/, "");
const baseUrl = () => Cypress.env("API_BASE_URL") || "http://localhost:3000";
const basePath = () => (Cypress.env("API_BASE_PATH") || "api").replace(/\/+$/, "");
const makeUrl = (path) => joinUrl(joinUrl(baseUrl(), basePath()), path);

export const getProdutos = ({ page = 1, limit = 10 } = {}) => {
  const url = makeUrl(`produtos?page=${page}&limit=${limit}`);
  return cy.request({
    method: "GET",
    url,
    failOnStatusCode: false,
  });
};

export const getProdutoPorId = (id) => {
  const url = makeUrl(`produtos/${id}`);
  return cy.request({
    method: "GET",
    url,
    failOnStatusCode: false,
  });
};
