// cypress/script/login-script.js

// 🔹 Input Email
export const inputEmail = (email) => {

  cy.get('#email')
    .should('be.visible')
    .clear();

  if (email !== '') {

    cy.get('#email').type(email);

  }

};

// 🔹 Input Password
export const inputPassword = (password) => {

  cy.get('#password')
    .should('be.visible')
    .clear();

  if (password !== '') {

    cy.get('#password').type(password);

  }

};

// 🔹 Click Login
export const clickLogin = () => {
  cy.get('#submitLoginBtn')
    .should('be.visible')
    .click();
};

// 🔹 Submit Login With Enter Key
export const submitLoginWithEnter = () => {

  cy.get('#password')
    .should('be.visible')
    .type('{enter}');

};

// 🔹 Verify Error Message (Negative Case)
export const verifyErrorMessage = (expectedText) => {
  cy.get('#message')
    .should('be.visible')
    .and('contain.text', expectedText);
};

// 🔹 Verify No Error (Positive Case)
export const verifyNoErrorMessage = () => {
  cy.get('#message')
    .should('not.be.visible');
};