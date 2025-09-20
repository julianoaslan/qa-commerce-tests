class LoginPage {
  els = {
    email: () => cy.get("#email"),
    password: () => cy.get("#password"),
    submit: () => cy.get('form#login-form button[type="submit"]'),
    error: () => cy.get("#error-container"),
  };

  assertLoaded() {
    cy.get("main h1").should(($h1) => {
      expect($h1.text().trim().toUpperCase()).to.eq("LOGIN");
    });
  }

  fillEmail(email) {
    this.els.email().clear().type(email);
  }

  fillPassword(password) {
    this.els.password().clear().type(password, { log: false });
  }

  submit() {
    this.els.submit().click();
  }

  assertError(msg) {
    this.els.error()
      .should("be.visible")
      .and("have.class", "alert")
      .and("have.class", "alert-danger")
      .and("contain", msg);
  }
}

export default new LoginPage();
