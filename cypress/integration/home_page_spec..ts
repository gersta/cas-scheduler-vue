/// <reference types="cypress" />

const path = require("path");

describe("Initial load", () => {
  before(() => {
    cy.visit("/"); // leverage baseUrl from cypress.json
  });

  it("should display the lecture code", () => {
    cy.get(".lecture-item")
      .first()
      .get(".cas-lecture-code")
      .first()
      .should("have.text", "T3M10101");
  });

  it("should display the lecture name", () => {
    cy.get(".lecture-item")
      .first()
      .get(".cas-lecture-name")
      .first()
      .should("have.text", "Angewandte Ingenieurmathematik");
  });

  it("should display the english lecture name", () => {
    cy.get(".lecture-item")
      .first()
      .get(".cas-lecture-name-eng")
      .first()
      .should("have.text", "Applied Engineering Mathematics");
  });

  it("should display the lecture blocks", () => {
    cy.get(".lecture-item")
      .first()
      .get(".cas-lecture-block")
      .should("exist");
  });
});

describe("Lecture details", () => {
  let modal;

  before(() => {
    cy.visit("/"); // leverage baseUrl from cypress.json

    modal = cy
      .get(".lecture-item")
      .filter(":visible") // skip elements hidden via v-if
      .first()
      .click();
  });

  it("should display the lecture owner", () => {
    modal
      .get(".cas-lecture-owner")
      .should("have.text", "Prof. Dr. Volker Schulz");
  });

  it("should display the lecture language", () => {
    modal
      .get(".cas-lecture-language")
      .should("have.text", "Deutsch/Englisch");
  });

  it("should display the lecture forms", () => {
    modal
      .get(".cas-lecture-forms")
      .should("exist");
  });

  it("should display the lecture methods", () => {
    modal
      .get(".cas-lecture-methods")
      .should("exist");
  });

  it("should display the lecture exam", () => {
    modal
      .get(".cas-lecture-exam")
      .should("have.text", "Klausur");
  });

  it("should display the lecture exam duration", () => {
    modal
      .get(".cas-lecture-exam-duration")
      .should("have.text", "120");
  });

  it("should display the lecture exam marking", () => {
    modal
      .get(".cas-lecture-exam-marking")
      .should("have.text", "true");
  });

  it("should display the lecture total workload", () => {
    modal
      .get(".cas-lecture-workload-total")
      .should("have.text", "150");
  });

  it("should display the lecture present workload", () => {
    modal
      .get(".cas-lecture-workload-present")
      .should("have.text", "50");
  });

  it("should display the lecture self-study workload", () => {
    modal
      .get(".cas-lecture-workload-selfstudy")
      .should("have.text", "100");
  });

  it("should display the lecture ects points", () => {
    modal
      .get(".cas-lecture-ects")
      .should("have.text", "5");
  });

  it("should display the lecture update date", () => {
    modal
      .get(".cas-lecture-updated-on")
      .should("have.text", "2020-07-13");
  });
});

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
});

describe("Modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should bootstrap with closed modal", () => {
    cy.get(".lecture-modal").should("not.exist");
  });

  it("should open when any lecture is clicked", () => {
    cy.get(".lecture-item")
      .filter(":visible") // skip those excluded with v-if
      .first()
      .click();

    cy.get(".lecture-modal").should("exist");
  });

  it("should close when close-button is clicked", () => {
    cy.get(".lecture-item")
      .filter(":visible") // skip those excluded with v-if
      .first()
      .click();

    cy.get(".lecture-modal").should("exist");

    cy.get(".modal-close-button").click();

    cy.get(".lecture-modal").should("not.exist");
  });

  it("should download ics file when block button is clicked", () => {
    const downloadFolder = Cypress.config("downloadsFolder");

    cy.get(".lecture-item")
      .filter(":visible") // skip those excluded with v-if
      .first()
      .click();

    cy.get(".block-download")
      .first()
      /*             .should('have.attr', 'download')
            .should('have.attr', 'href') */
      .as("download-button");

    cy.get("@download-button")
      .invoke("attr", "href")
      .then((href) => {
        cy.get("@download-button").click();

        const hrefWithoutFolder = href.replace("/ics/", "");
        const filename = path.join(downloadFolder, hrefWithoutFolder);

        cy.readFile(filename)
          .should("exist")
          .should("contain", "BEGIN:VCALENDAR");
      });
  });
});
