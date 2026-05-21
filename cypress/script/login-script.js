// cypress/script/login-script.js

// ========================
// 🔹 SELECTORS
// ========================

export const selectors = {

  emailField: '#email',
  passwordField: '#password',
  submitBtn: '#submitLoginBtn',
  errorMessage: '#message'

};

// ========================
// 🔹 GENERIC INPUT
// ========================

export const inputField = (locator, value) => {

  cy.get(locator)
    .should('be.visible')
    .clear();


  // allow empty validation case
  if (value) {
    cy.log(JSON.stringify(value));
    cy.get(locator).type(value);

  }

};

// ========================
// 🔹 CLICK BUTTON
// ========================

export const clickButton = (locator) => {

  cy.get(locator)
    .should('be.visible')
    .click();

};

// ========================
// 🔹 SUBMIT WITH ENTER
// ========================

export const submitWithEnter = (locator) => {

  cy.get(locator)
    .should('be.visible')
    .type('{enter}');

};

// ========================
// 🔹 VERIFY ERROR MESSAGE
// ========================

export const verifyErrorMessage = (expectedText) => {

  cy.get(selectors.errorMessage)
    .should('be.visible')
    .and('contain.text', expectedText);

};

// ========================
// 🔹 VERIFY NO ERROR
// ========================

export const verifyNoErrorMessage = () => {

  cy.get(selectors.errorMessage)
    .should('not.be.visible');

};

// ========================
// 🔹 VERIFY UI
// ========================

export const verifyCompanyHeader = () => {

  cy.contains('h2', 'Login - Shop')
    .should('be.exist');

};

export const verifyEmailTextbox = () => {

  cy.get(selectors.emailField)
    .should('be.visible');

};

export const verifyPasswordTextbox = () => {

  cy.get(selectors.passwordField)
    .should('be.visible');

};

export const verifyPasswordMasked = () => {

  cy.get(selectors.passwordField)
    .should('have.attr', 'type', 'password');

};