describe("SignUp", () => {
  it("should display sign up page with form and login link", () => {
    cy.visit("/signup");
    cy.get("section").should("exist");
  });

  it("should navigate to login page when login link is clicked", () => {
    cy.visit("/signup");

    cy.contains("Already have an account?")
      .find("a")
      .should("have.attr", "href", "/login")
      .click();

    // Verify that the user is redirected to the login page
    cy.url().should("include", "/login");
  });
});
