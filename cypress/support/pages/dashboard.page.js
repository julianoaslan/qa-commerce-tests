class DashboardPage {
  assertDashboardForAdmin() {
    cy.contains("h1", /minha conta/i, { timeout: 10000 }).should("be.visible");

    cy.contains(/olá.*admin/i).should("be.visible");

    cy.location("pathname").should("include", "/dashboard.html");
  }
}

export default new DashboardPage();
