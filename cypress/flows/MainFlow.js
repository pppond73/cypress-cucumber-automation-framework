// cypress/flows/MainFlow.js

import pageAction from "../Page/page";
import * as messageError from "../script/message-script";
import * as shippingScript from "../script/shipping-details-script";

// ========================
// 🔹 LOGIN
// ========================

export const login = (credentials, useEnter = false) => {

    pageAction.login(
        credentials.email,
        credentials.password,
        useEnter
    );

};


// ========================
// 🔹 LOGOUT
// ========================

export const logoutFlow = () => {

    pageAction.logout();

};


// ========================
// 🔹 CHECKOUT
// ========================

export const checkoutFlow = (products) => {
    cy.log('Checkout flow');

    pageAction.checkoutProduct(products);
    pageAction.submitCheckout();
};

// ========================
// 🔹 SHIPPING INVALID
// ========================

export const shippingInvalidFlow = (products, invalidAddress) => {
    cy.log('Shipping - Invalid');

    pageAction.shippingDetails(invalidAddress);
    pageAction.submitShipping();
};

// ========================
// 🔹 SHIPPING VALID
// ========================

export const shippingValidFlow = (products, validAddress) => {
    cy.log('Shipping - Valid');

    pageAction.shippingDetails(validAddress);
    pageAction.submitShipping();
};

// ========================
// 🔹 VERIFY SUCCESS
// ========================

export const verifyOrderSuccess = (validAddress) => {
    cy.log('Verify Order Success');

    pageAction.verifyShippingSuccess(validAddress);
};