// cypress/support/step_definitions/checkoutSteps.js

import {
    Given,
    When,
    Then
} from "@badeball/cypress-cucumber-preprocessor";

import * as flow from "../../flows/MainFlow";

import pageAction from "../../Page/Page";


// ========================
// GIVEN
// ========================

Given(
    'user already logged in',
    function () {

        cy.visit('/auth_ecommerce.html');

        flow.login(
            this.users.validUser
        );

    }
);

Given(
    'user has one item in cart',
    function () {

        flow.pickupProductFlow(
            this.products.singleProduct
        );

    }
);

Given(
    'user has multiple items in cart',
    function () {

        flow.pickupProductFlow(
            this.products.multipleProducts
        );

    }
);


// ========================
// WHEN
// ========================

When(
    'user clicks checkout',
    () => {

        pageAction.clickCheckout();

    }
);

When(
    'user submits invalid shipping address',
    function () {

        flow.shippingInvalidFlow(
            this.address.invalidAddress
        );

    }
);

When(
    'user submits valid shipping address',
    function () {

        flow.shippingValidFlow(
            this.address.validAddress
        );

    }
);

When(
    'user removes product {string}',
    (productName) => {

        flow.removeItemsFlow(
            productName
        );

    }
);

When(
    'user removes multiple products',
    function () {

        flow.removeItemsFlow(
            this.products.multipleProducts
        );

    }
);

When(
    'user updates product quantity',
    function () {

        flow.updateQuantityFlow(
            this.products.multipleProducts
        );

    }
);

When(
    'user pickup one item',
    function () {

        flow.pickupProductFlow(
            this.products.singleProduct
        );

    }
);



// ========================
// THEN
// ========================

Then(
    'user should navigate to shipping page',
    () => {

        pageAction.verifyShippingPage();

    }
);

Then(
    'system should show required validation',
    () => {

        pageAction.verifyShippingFail();

    }
);

Then(
    'order should be successful',
    function () {

        pageAction.verifyShippingSuccess(
            this.address.validAddress
        );

    }
);

Then(
    'product {string} should be removed',
    (productName) => {

        pageAction.verifyCartItemRemoved(
            productName
        );

    }
);

Then(
    'cart should be empty',
    () => {

        pageAction.verifyEmptyCart();

    }
);

Then(
    'cart total should update correctly',
    function () {

        flow.verifyCartTotalFlow(
            this.products.multipleProducts
        );

    }
);