/// <reference types="cypress" />

import { email, password } from "../fixtures/user";

describe('Add cards to backlog', () => {
 it('add new card', () => {
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

        //cy.get('h1').should("contain", "David");

        cy.get(`[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`).eq(0).click();

        // domain change wait
        cy.wait(20000);

        // bypass cross domain limitation 
        cy.origin('https://trello.com', () => {
            cy.get('[href="/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3"]').click();
            cy.wait(8000)
            //Select Backlog column
            cy.get('[data-testid="list-wrapper"]').should('contain.text', 'Backlog')//.then(
                //(card) => {
                    //Add first card
                    cy.get('[data-testid="list-add-card-button"]').eq(0).click()
                    cy.get('[data-testid="list-card-composer-textarea"]').eq(0).type('Elaborer un plan de test')
                    cy.get('body').click()
                    cy.get('[data-testid="card-name"]').eq(0).click()
                    cy.wait(4000)
                    cy.get('.js-description-fake-text-area').type('Elaborer un plan de test détaillé pour le projet')
                    cy.get('body').click()
                    cy.get('[data-testid="list-card-composer-add-card-button"]').should('have.text', 'Add card').click()
                //})

            cy.get('[data-testid="list-wrapper"]').should('contain.text', 'Backlog')//.then(
                //(card) => {
                    //Add second card
                    //cy.get('[data-testid="list-add-card-button"]').eq(0).click()
                    cy.get('[data-testid="list-card-composer-textarea"]').eq(0).type('Concevoir les cas de test')
                    cy.get('[data-testid="list-card-composer-add-card-button"]').click()
                //})
        });
    })

})