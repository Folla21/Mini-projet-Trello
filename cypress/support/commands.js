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

Cypress.Commands.add('login', name => {
  cy.session(
    name,
    () => {
      cy.visit("https://trello.com/");

      cy.contains("Log in").click();

      cy.wait(5000);

      // Visit atlassian to avoid domain change issue
      cy.visit("https://id.atlassian.com");

      // cy.wait(8000);

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
        cy.wait(10000);
      });

      cy.origin("https://team.atlassian.com/", () => {
        const { email } = Cypress.require("../fixtures/user");
        cy.get(
          `[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`
        ).click();
      });

      cy.get('[href="/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3"]').click();
    }
  )
})