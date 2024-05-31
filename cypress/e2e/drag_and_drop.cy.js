import { name } from "../fixtures/user";

describe('Dragtest', () => {
    it('should dragndrop', () => {
      cy.login(name);
    // Go to the dashboard
      cy.visit("https://trello.com/b/Or7IO0r0/wcs-qa2024-cypress-trello-grp3");
    //Select Backlog column
    cy.wait(4500)
    cy.get('.T9JQSaXUsHTEzk').eq(0).should('have.text', 'Elaborer un plan de test')
    .drag('[data-list-id="66572a4a5876a9cde30b2ba3"]', {force:true}).should('exist');

    cy.get('.T9JQSaXUsHTEzk').eq(0).should('have.text', 'Concevoir les cas de test')
    .drag('[data-list-id="66572a4a5876a9cde30b2ba3"]', {force:true}).should('exist');

    cy.get('.T9JQSaXUsHTEzk').eq(1).should('have.text', 'Automatiser des tests de régression')
    .drag('[data-list-id="66572a4569f3851f8f6e8ef6"]', {force:true}).should('exist');

    cy.get('.T9JQSaXUsHTEzk').eq(0).should('have.text', 'Exécuter des tests fonctionnels')
    .drag('[data-list-id="66572a2f14a26f908f185da7"]', {force:true}).should('exist');

    cy.get('.T9JQSaXUsHTEzk').eq(0).should('have.text', 'Exécuter des tests de performance')
    .drag('[data-list-id="66572a2f2549c3a69ca535a1"]', {force:true}).should('exist');
    })
  })


