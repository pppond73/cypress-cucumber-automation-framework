// cypress/support/step_definitions/checkoutSteps.js

import {
    When,
    Then,
    defineStep as And
} from "@badeball/cypress-cucumber-preprocessor";

import * as flow from "../../flows/MainFlow";
import pageAction from "../../Page/Page";


// ========================
// 🔹 WHEN
// ========================

When('user selects product and checkout', function () {

    flow.checkoutFlow(this.products);

});

And('submits invalid shipping address', function () {

    flow.shippingInvalidFlow(
        this.products,
        this.address.invalidAddress
    );

});

And('submits valid shipping address', function () {

    flow.shippingValidFlow(
        this.products,
        this.address.validAddress
    );

});


// ========================
// 🔹 THEN
// ========================

Then('user should navigate to shipping page', () => {

    pageAction.verifyShippingPage();

});


Then('system should show required field validation', () => {

    pageAction.verifyShippingFail();

    cy.log('Validation tooltip verified');

});


Then('order should be successful', () => {

    pageAction.verifyShippingSuccess(validAddress);

});