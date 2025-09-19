const joinUrl = (a, b) => a.replace(/\/+$/, "") + "/" + b.replace(/^\/+/, "");
const baseUrl = () => Cypress.env("API_BASE_URL") || "http://localhost:3000";
const basePath = () => (Cypress.env("API_BASE_PATH") || "").replace(/\/+$/, "");
const makeUrl = (path) => {
  const root = baseUrl();
  const bp = basePath();
  const full = bp ? joinUrl(root, bp) : root;
  return joinUrl(full, path);
};

export const postAdicionarProdutoCarrinho = ({ userId, productId, quantity }) => {
  const url = makeUrl("carrinho");
  const token = Cypress.env("AUTH_TOKEN");
  const headers = token ? { Authorization: token } : {};

  return cy.request({
    method: "POST",
    url,
    headers,
    body: { userId, productId, quantity },
    failOnStatusCode: false,
  });
};

export const getCarrinhoPorUsuario = (userId) => {
  const url = makeUrl(`carrinho/${userId}`);
  const token = Cypress.env("AUTH_TOKEN");
  const headers = token ? { Authorization: token } : {};

  return cy.request({
    method: "GET",
    url,
    headers,
    failOnStatusCode: false,
  });
};

export const deleteCarrinhoPorUsuario = (userId) => {
  const url = makeUrl(`carrinho/${userId}`);
  const token = Cypress.env("AUTH_TOKEN");
  const headers = token ? { Authorization: token } : {};

  return cy.request({
    method: "DELETE",
    url,
    headers,
    failOnStatusCode: false,
  });
};
