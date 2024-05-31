// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@4tw/cypress-drag-drop'

Cypress.Commands.add("login", (name) => {
  cy.session(name, () => {
    cy.visit("https://trello.com/");

    cy.contains("Log in").click();

    cy.wait(5000);

    // Visit atlassian to avoid domain change issue
    cy.visit("https://id.atlassian.com");

    cy.origin("https://id.atlassian.com", () => {
      const { email, password } = Cypress.require("../fixtures/user");

      // enter email
      cy.get('[data-testid="username"]').type(email);

      // goto next
      cy.get("#login-submit").click();

      // Detect that we are automate
      cy.wait(4000);

      // enter password
      cy.get("#password").type(password);

      // goto next
      cy.get("#login-submit").click();

      // domain change wait is veryyy long
      cy.wait(20000);
    });

    cy.origin("https://team.atlassian.com/", () => {
      const { email } = Cypress.require("../fixtures/user");

      cy.get(
        `[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`
      ).click();
    });

    cy.get('[href="/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3"]').click();
  });
});

Cypress.Commands.add("fillCard", (myCy, { description }) => {
  myCy.get(".js-description-fake-text-area").click({ force: true });
  cy.wait(1000);

  // Enter the description
  myCy.get("#ak-editor-textarea").type(description);
  cy.wait(1000);

  // Save text
  myCy.get('[data-testid="editor-save-button"]').click();
  myCy.wait(666);
});

Cypress.Commands.add("addCard", ({ title, description }, column) => {
  //Add card
  const board = cy.get("#board");
  const currentColumn = board.find("li").eq(column);
  const columnFooter = currentColumn
    .get("[data-testid='list-footer']")
    .eq(column);
  const addButton = columnFooter.first("button");

  // Add card
  addButton.click();
  board
    .get('[data-testid="list-card-composer-textarea"]')
    .eq(column)
    .last()
    .type(title);
  cy.get("body").click();
  cy.wait(444);

  // Enter card
  const card = currentColumn.get('[data-testid="card-name"]').last();
  cy.wait(4100);
  card.click({ force: true });

  cy.fillCard(card, { description });

  cy.log("Closing the card");
  cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
  cy.get(".card-detail-window").should("not.exist");
});
