import React from "react";
import Button from "@/components/UI/Button/Button";

describe("Button Component", () => {
  it("should render a button with the provided text", () => {
    const buttonText = "Click me!";
    cy.mount(<Button type="button">{buttonText}</Button>);
    cy.get("button").should("have.text", buttonText);
  });

  it("should have the specified type", () => {
    const buttonType = "submit";
    cy.mount(<Button type={buttonType}>Click me!</Button>);
    cy.get("button").should("have.attr", "type", buttonType);
  });

  it("should have the specified className", () => {
    const buttonClass = "custom-button";
    cy.mount(
      <Button type="button" className={buttonClass}>
        Click me!
      </Button>
    );
    cy.get("button").should("have.class", buttonClass);
  });

  it("should call the onClick handler when clicked", () => {
    const onClick = cy.stub();
    cy.mount(
      <Button type="button" onClick={onClick}>
        Click me!
      </Button>
    );
    cy.get("button").click();
    cy.wrap(onClick).should("have.been.calledOnce");
  });
});
