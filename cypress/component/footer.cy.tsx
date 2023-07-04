import Footer from "@/components/Footer/Footer";
describe("Footer Component", () => {
  it("should render the Footer component", () => {
    cy.mount(<Footer />);
    // Asserting that the footer element exists
    cy.get("footer").should("exist");

    // Asserting that the CareFinder title is rendered with the correct text
    cy.contains("h1", "CareFinder");

    // Asserting that the About Us section is rendered with the correct heading and links
    cy.contains("h1", "About us");
    cy.contains("a", "News").should("have.attr", "href", "/news");
    cy.contains("a", "Contact").should("have.attr", "href", "/contact");

    // Asserting that the Quick Links section is rendered with the correct heading and links
    cy.contains("h1", "Quick links");
    cy.contains("a", "My account").should("have.attr", "href", "/account");
    cy.contains("a", "Library").should("have.attr", "href", "/library");
    cy.contains("a", "Book an appointment").should(
      "have.attr",
      "href",
      "/appointment"
    );
  });
});
