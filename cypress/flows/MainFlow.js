// cypress/flows/MainFlow.js

import pageAction from "../Page/page";

export const login = (
    credentials,
    useEnter = false
) => {

    pageAction.login(
        credentials,
        useEnter
    );

    pageAction.mockSession();

};

export const logoutFlow = () => {

    pageAction.logout();

};

export const pickupProductFlow = (
    products
) => {

    pageAction.pickupItems(products);

    pageAction.updateQuantity(products);

    pageAction.verifyCartTotal(products);

};

export const checkoutFlow = (
    products
) => {

    pickupProductFlow(products);
    pageAction.clickCheckout();

};

export const shippingInvalidFlow = (
    invalidAddress
) => {

    pageAction.shippingDetails(
        invalidAddress
    );

    pageAction.submitShipping();

};

export const shippingValidFlow = (
    validAddress
) => {

    pageAction.shippingDetails(
        validAddress
    );

    pageAction.submitShipping();

};

export const removeItemsFlow = (
    products
) => {

    pageAction.removeItems(products);

};

export const updateQuantityFlow = (
    products
) => {

    pageAction.updateQuantity(
        products
    );

};

export const verifyCartTotalFlow = (
    products
) => {

    pageAction.verifyCartTotal(
        products
    );

};