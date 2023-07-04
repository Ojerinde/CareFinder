import React from "react";
import Pagination from "@/components/Pagination/Pagination";

describe("Pagination Component", () => {
  it("should render the Pagination component", () => {
    // Test data
    const itemsPerPage = 10;
    const totalItems = 100;
    const onChange = cy.stub();

    // Mounting the Pagination component with test props and setup
    cy.mount(
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onChange={onChange}
      />
    );

    // Asserting that the pagination component exists
    cy.get(".pagination").should("exist");

    // Asserting that the current page and total pages are displayed correctly
    cy.contains(".pagination", "Showing page 1 of 10");

    // Clicking on the next button and asserting that the onChange function is called
    cy.get("#right").click();
    cy.wrap(onChange).should("be.calledWith", 2);

    // Clicking on a page number and asserting that the onChange function is called with the correct page number
    cy.get(".pagination").contains("p", "3").click();
    cy.wrap(onChange).should("be.calledWith", 3);
  });
});
