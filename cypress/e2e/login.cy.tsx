describe("Login", () => {
  it("Google icon should exist", () => {
    cy.visit("/login");

    cy.get("#icons").find("svg").should("exist").click();
  });
  it("should display sign up link and navigate to signup page when clicked", () => {
    cy.visit("/login");

    cy.contains("Do not have an account?")
      .find("a")
      .should("have.attr", "href", "/signup")
      .click();

    // Verify that the user is redirected to the signup page
    cy.url().should("include", "/signup");
  });
});
