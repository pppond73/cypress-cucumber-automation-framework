// cypress/Page/page.js

import * as loginScript from "../script/login-script";
import * as productScript from "../script/product-script";
import * as shippingScript from "../script/shipping-details-script";

class PageAction {

    static login(
        credentials,
        useEnter = false
    ) {

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

    static mockSession() {

        loginScript.mockSession();

    }

    static verifyError(message) {

        loginScript.verifyErrorMessage(message);

    }

    static verifyNoError() {

        loginScript.verifyNoErrorMessage();

    }

    static logout() {

        productScript.logout();

    }

    static verifyShoppingCartPage() {

        productScript.verifyShoppingCartPage();

    }

    static pickupItems(products) {

        productScript.pickupItems(products);

    }

    static updateQuantity(products) {

        productScript.updateQuantity(products);

    }

    static verifyCartTotal(products) {

        productScript.calCartTotal(products);

    }

    static clickCheckout() {

        productScript.clickCheckout();

    }

    static removeItems(products) {

        productScript.removeItems(products);

    }

    static verifyCartItemExists(productName) {

        productScript.verifyCartItemExists(
            productName
        );

    }

    static verifyCartItemRemoved(productName) {

        productScript.verifyCartItemRemoved(
            productName
        );

    }

    static verifyEmptyCart() {

        productScript.verifyEmptyCart();

    }

    static verifyShippingPage() {

        shippingScript.verifyShippingPage();

    }

    static shippingDetails(addressData) {

        shippingScript.fillShippingDetails(
            addressData
        );

    }

    static submitShipping() {

        shippingScript.submitShipping();

    }

    static verifyShippingFail() {

        shippingScript.verifyRequiredField(
            'input[name="city"]'
        );

    }

    static verifyShippingSuccess(
        addressData
    ) {

        shippingScript.verifyShippingSuccess(
            addressData
        );

    }

}

export default PageAction;
