/// <reference types="cypress" />

import { email, password } from "../fixtures/user";

describe('Trello connexion', () => {
 it('successful sign in', () => {
        // Visit atlassian to avoid domain change issue
        cy.visit('https://id.atlassian.com');

        // enter email
        cy.get('[data-testid="username"]').type(email);

        // goto next
        cy.get('#login-submit').click();

        // Detect that we are automate
        cy.wait(8000);

        // enter password
        cy.get('#password').type(password);

        // goto next
        cy.get('#login-submit').click();

        // domain change wait is veryyy long
        cy.wait(20000);

        cy.get('h1').should("contain", "Bonjour");

        cy.get(`[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`).click();

        // domain change wait
        cy.wait(15000);

        // bypass cross domain limitation 
        cy.origin('https://trello.com', () => {
            cy.get('[href="/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3"]').click();
        });
    })
});
