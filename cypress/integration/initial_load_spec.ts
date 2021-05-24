/// <reference types="cypress" />

describe("Initial load", () => {
    const sizes = [768, 1280];
  
    sizes.forEach( (size) => {
      describe(`screen size ${size}`, {
        viewportHeight: 1024,
        viewportWidth: size
      }, () => {
  
        before(() => {
          cy.visit("/"); // leverage baseUrl from cypress.json
        })
      
        it("should display the lecture code", () => {
          cy.get(".cas-lecture-code")
            .filter(":visible")
            .first()
            .should("have.text", "T3M10101");
        });
      
        it("should display the lecture name", () => {
          cy.get(".cas-lecture-name")
            .filter(":visible")
            .first()
            .should("have.text", "Angewandte Ingenieurmathematik");
        });
      
        it("should display the english lecture name", () => {
          cy.get(".cas-lecture-name-eng")
            .filter(":visible")
            .first()
            .should("have.text", "Applied Engineering Mathematics");
        });
      
        it("should display first block start", () => {
          cy.get(".cas-lecture-first-block-start")
            .filter(":visible")
            .first()
            .should("have.text", "08.10.2020");
        });
  
        it("should display first block end", () => {
          cy.get(".cas-lecture-first-block-end")
            .filter(":visible")
            .first()
            .should("have.text", "10.10.2020");
        });
  
        it("should display first block location", () => {
          cy.get(".cas-lecture-first-block-location")
            .filter(":visible")
            .first()
            .should("have.text", "HN");
        });
  
        it("should display second block start", () => {
          cy.get(".cas-lecture-second-block-start")
            .filter(":visible")
            .first()
            .should("have.text", "09.11.2020");
        });
  
        it("should display second block end", () => {
          cy.get(".cas-lecture-second-block-end")
            .filter(":visible")
            .first()
            .should("have.text", "11.11.2020");
        });
  
        it("should display second block location", () => {
          cy.get(".cas-lecture-second-block-location")
            .filter(":visible")
            .first()
            .should("have.text", "HN");
        });
      })
    })
  
    
  });