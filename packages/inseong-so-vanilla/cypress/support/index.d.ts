/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    saveLocalStorage(): void;
    restoreLocalStorage(): void;
    categoryClick(index: number): Chainable<void>;
    getCategoryTitle(text: string): Chainable<Element>;
  }
}
