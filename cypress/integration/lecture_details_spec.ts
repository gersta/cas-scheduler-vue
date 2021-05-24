/// <reference types="cypress" />

describe("Lecture details", () => {
    before(() => {
      cy.visit("/"); // leverage baseUrl from cypress.json

      // open the modal once and then access the sub-elements in the tests
      cy.get(".lecture-item")
        .filter(":visible") // skip elements hidden via v-if
        .first()
        .click()
    });
  
    it("should display the lecture owner", () => {
      cy.get(".cas-lecture-owner")
        .should("have.text", "Prof. Dr. Volker Schulz");
    });
  
    it("should display the lecture language", () => {
      cy.get(".cas-lecture-language").should("have.text", "Deutsch/Englisch");
    });
  
    it("should display the lecture forms", () => {
      cy.get(".cas-lecture-forms").should("exist");
    });
  
    it("should display the lecture methods", () => {
      cy.get(".cas-lecture-methods").should("exist");
    });
  
    it("should display the lecture exam", () => {
      cy.get(".cas-lecture-exam").should("have.text", "Klausur");
    });
  
    it("should display the lecture exam duration", () => {
      cy.get(".cas-lecture-exam-duration").should("have.text", "120min");
    });
  
    it("should display the lecture exam marking", () => {
      cy.get(".cas-lecture-exam-marking").should("have.text", "true");
    });
  
    it("should display the lecture total workload", () => {
      cy.get(".cas-lecture-workload-total").should("have.text", "150h");
    });
  
    it("should display the lecture present workload", () => {
      cy.get(".cas-lecture-workload-present").should("have.text", "50h");
    });
  
    it("should display the lecture self-study workload", () => {
      cy.get(".cas-lecture-workload-selfstudy").should("have.text", "100h");
    });
  
    it("should display the lecture ects points", () => {
      cy.get(".cas-lecture-ects").should("have.text", "5");
    });
  
    it("should display the lecture update date", () => {
      cy.get(".cas-lecture-updated-on").should("contain.text", "13.07.2020");
    });
  });