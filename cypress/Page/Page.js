// cypress/Page/page.js

import * as loginScript from "../script/login-script";
import * as productScript from "../script/product-script";
import * as shippingScript from "../script/shipping-details-script";

class PageAction {

    // ========================
    // 🔹 LOGIN
    // ========================

    static verifyCompanyHeader() {

        loginScript.verifyCompanyHeader();

    }

    static verifyEmailTextbox() {

        loginScript.verifyEmailTextbox();

    }

    static verifyPasswordTextbox() {

        loginScript.verifyPasswordTextbox();

    }

    static inputPassword(password) {

        loginScript.inputField(
            loginScript.selectors.passwordField,
            password
        );

    }

    static verifyPasswordMasked() {

        loginScript.verifyPasswordMasked();

    }

    static verifyLoginButton() {

        loginScript.verifyLoginButton();

    }

    static login(credentials, useEnter = false) {

        loginScript.inputField(
            loginScript.selectors.emailField,
            credentials.email
        );

        loginScript.inputField(
            loginScript.selectors.passwordField,
            credentials.password
        );

        if (useEnter) {

            loginScript.submitWithEnter(
                loginScript.selectors.passwordField
            );

        } else {

            loginScript.clickButton(
                loginScript.selectors.submitBtn
            );

        }

    }

    static verifyError(message) {
        loginScript.verifyErrorMessage(message);
    }

    static verifyNoError() {
        loginScript.verifyNoErrorMessage();
    }


    // ========================
    // 🔹 PRODUCT
    // ========================

    static logout() {
        productScript.logout();
    }

    static verifyShoppingCartPage() {
        productScript.verifyShoppingCartPage();
    }

    static checkoutProduct(productData) {
        productScript.checkoutProcess(productData);
    }

    static submitCheckout() {
        productScript.checkoutBtn(true);
    }

    static verifyShippingPage() {
        shippingScript.verifyShippingPage();
    }

    static verifyRedirectToLoginPage() {
        cy.location('pathname')
            .should('eq', '/auth_ecommerce.html');

        cy.get('#submitLoginBtn')
            .should('be.visible');
    }


    // ========================
    // 🔹 SHIPPING
    // ========================

    static shippingDetails(addressData) {
        shippingScript.fillShippingDetails(addressData);
    }

    static submitShipping() {
        shippingScript.submitShipping();
    }

    static verifyShippingFail() {
        shippingScript.verifyRequiredField('input[name="city"]');
    }

    static verifyShippingSuccess(addressData) {
        shippingScript.verifyShippingSuccess(addressData);
    }
}

export default PageAction;