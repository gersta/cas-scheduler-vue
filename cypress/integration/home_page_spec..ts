/// <reference types="cypress" />

const path = require('path')

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

    it('should close when close-button is clicked', () => {
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

    it('should download ics file when block button is clicked', () => {
        const downloadFolder = Cypress.config('downloadsFolder')

        cy.get('.lecture-item')
            .filter(':visible') // skip those excluded with v-if
            .first()
            .click();

        cy.get('.block-download')
            .first()
/*             .should('have.attr', 'download')
            .should('have.attr', 'href') */
            .as('download-button');

        cy.get('@download-button')
            .invoke('attr', 'href')
            .then( (href) => {
                cy.get('@download-button').click()

                const hrefWithoutFolder = href.replace("/ics/", "")
                const filename = path.join(downloadFolder, hrefWithoutFolder)

                cy.readFile(filename)
                    .should('exist')
                    .should('contain', 'BEGIN:VCALENDAR')
            })
    })
});

