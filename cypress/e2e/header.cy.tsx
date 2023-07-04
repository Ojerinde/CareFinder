describe("LandingNavigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to Home page when Home link is clicked", () => {
    cy.contains("Home").click();

    // Verify that the user is redirected to the Home page
    cy.url().should("include", "/");
  });

  it("should navigate to About page when About link is clicked", () => {
    cy.contains("About").click();

    // Verify that the user is redirected to the About page
    cy.url().should("include", "/about");
  });

  it("should navigate to Search page when Search link is clicked", () => {
    cy.contains("Search").click();

    // Verify that the user is redirected to the Search page
    cy.url().should("include", "/hospitals");
  });

  it("should navigate to Login page when Login button is clicked", () => {
    cy.contains("Login").click();

    // Verify that the user is redirected to the Login page
    cy.url().should("include", "/login");
  });

  it("should navigate to Signup page when Signup button is clicked", () => {
    cy.contains("Signup").click();

    // Verify that the user is redirected to the Signup page
    cy.url().should("include", "/signup");
  });
});
