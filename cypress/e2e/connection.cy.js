/// <reference types="cypress" />
import { name } from "../fixtures/user";

describe("Atlasian connexion", () => {
  it("Successfully connect to Trello", () => {
    // login session
    cy.login(name);

    // Go to the dashboard
    cy.visit("https://trello.com/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3");

    // List of all trello proejct, choose the correct one
    cy.get('[data-testid="board-name-display"]').should('have.text', "wcs-QA2024-cypress-trello-grp3");
  });
});
