class HeaderPage {
  openHome() {
    cy.visit("/"); 
  }

  goToLogin() {
    cy.contains("a", /minha conta/i).click();
   
    cy.location("pathname").should("match", /login\.html|dashboard\.html/);
  }
}

export default new HeaderPage();
