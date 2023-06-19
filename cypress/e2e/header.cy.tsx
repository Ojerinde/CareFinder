describe("Header", () => {
  it("should navigate to home page when logo is clicked", () => {
    cy.visit("/home");

    cy.get("#header__logo").click();

    cy.url().should("include", "/home");
  });

  it("should navigate to addHospital page when add icon is clicked", () => {
    cy.visit("/home");

    cy.get("#header__add").click();

    cy.url().should("include", "/home/addHospital");
  });

  it("should navigate to profile page when profile icon is clicked", () => {
    cy.visit("/home");

    cy.get("#header__profile").click();

    cy.url().should("include", "/home/profile");
  });

  it("should log out when logout button is clicked", () => {
    cy.visit("/home");

    cy.contains("Logout").click();

    cy.url().should("include", "/");
  });

  it("should navigate to login page when login link is clicked", () => {
    cy.visit("/home");

    cy.contains("Login").click();

    cy.url().should("include", "/login");
  });
});
