/// <reference types="cypress" />
import { name } from "../fixtures/user";
import cards from "../fixtures/cards";
import backlog from "../fixtures/backlog";

describe('Add cards to backlog', () => {
  it('add new card', () => {
    // login session
    cy.login(name);

    // Go to the dashboard
    cy.visit("https://trello.com/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3");
    //Select Backlog column

    for (let index = 0; index < cards.length; index++) {

      const card = cards[index];
      cy.log('creating a card ...');
      cy.addCard(card, backlog['Backlog']);
    }
  });
});