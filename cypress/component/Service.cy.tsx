import React from "react";
import Service from "@/components/LandingPage/Services/Service";

describe("Service Component", () => {
  beforeEach(() => {
    cy.mount(
      <Service
        icon={<div className="test-icon" />}
        name="Test Service"
        description="This is a test service"
      />
    );
  });

  it("should render the service item with correct content", () => {
    cy.get("#service__item").should("exist");
    cy.get(".test-icon").should("exist");
    cy.contains("Test Service").should("exist");
    cy.contains("This is a test service").should("exist");
  });
});
