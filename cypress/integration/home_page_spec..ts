/// <reference types="cypress" />


describe('Search', () => {
    beforeEach( () => {
        cy.visit('/') // leverage baseUrl from cypress.json
    });

    it('should bootstrap with empty search text', () => {
        cy.get('.lecture-search')
            .should('have.value', '')
    });

    it('it should type search text', () => {
        cy.get('.lecture-search')
            .type('Angewandte')
            .should('have.value', 'Angewandte')
    })
});

describe('Modal', () => {
    beforeEach( () => {
        cy.visit('/')
    })

    it('should bootstrap with closed modal', () => {
        cy.get('.lecture-modal')
            .should('not.exist')
    })

    it('should open when any lecture is clicked', () => {
        cy.get('.lecture-item')
            .filter(':visible') // skip those excluded with v-if
            .first()
            .click();

        cy.get('.lecture-modal')
            .should('exist')
    })

    it('should close when close-button is cliced', () => {
        cy.get('.lecture-item')
            .filter(':visible') // skip those excluded with v-if
            .first()
            .click();

        cy.get('.lecture-modal')
            .should('exist')

        cy.get('.modal-close-button')
            .click()

        cy.get('.lecture-modal')
            .should('not.exist')
    })
});

