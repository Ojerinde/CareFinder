describe("Login", () => {
  it("should log in with Google when Google icon is clicked", () => {
    cy.visit("/login");

    cy.get("#icons").find("svg").click();

    cy.url().should("include", "api/auth/signin");
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
