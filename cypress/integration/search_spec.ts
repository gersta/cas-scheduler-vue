/// <reference types="cypress" />

describe("Search", () => {
    beforeEach(() => {
      cy.visit("/"); // leverage baseUrl from cypress.json
    });
  
    it("should bootstrap with empty search text", () => {
      cy.get(".lecture-search").should("have.value", "");
    });
  
    it("it should type search text", () => {
      cy.get(".lecture-search")
        .type("Angewandte")
        .should("have.value", "Angewandte");
    });
  
    it("it should only list lectures containing search text", () => {
      const search = "Angewandte";
  
      cy.get(".lecture-search")
        .type(search)
  
      cy.get(".lecture-item")
        .filter(":visible")
        .should("contain.text", search)
    })
  });