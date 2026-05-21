// cypress/support/step_definitions/loginSteps.js

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import * as flow from "../../flows/MainFlow";

import pageAction from "../../Page/Page";

import * as messageError from "../../script/message-script";


// ========================
// 🔹 GIVEN
// ========================

Given('user is on login page', () => {

    cy.visit('/auth_ecommerce.html');

    cy.location('pathname')
        .should('eq', '/auth_ecommerce.html');

});


// ========================
// 🔹 WHEN
// ========================

When('user login with valid credentials', function () {

    flow.login(this.users.validUser);

});

When('user login with invalid email', function () {

    flow.login(this.users.invalidUser);

});

When('user login with invalid password', function () {

    flow.login(this.users.invalidPassword);

});

When('user login with unregistered credentials', function () {

    flow.login(this.users.unregistered);

});

When('user login with mismatched credentials', function () {

    flow.login(this.users.mismatched);

});

When('user login with empty email', function () {

    flow.login(this.users.emptyEmail);

});

When('user login with empty passowrd', function () {

    flow.login(this.users.emptyPassword);

});

When('user press Enter after entering valid credentials', function () {

    flow.login(this.users.validUser, true);

});

When('user refresh browser', () => {

    cy.reload();

});

When('user logout after successful login', () => {

    flow.logoutFlow();

});


// ========================
// 🔹 THEN
// ========================

Then('user should see shopping cart page', () => {

    pageAction.verifyNoError();

    pageAction.verifyShoppingCartPage();

});

Then('user should redirect to login page', () => {

    pageAction.verifyRedirectToLoginPage();

});

Then('error message should be displayed', () => {

    pageAction.verifyError(messageError.LOGIN_ERROR);

});