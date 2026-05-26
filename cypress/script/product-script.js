// 🔹 SELECTORS
const selectors = {
    logoutBtn: '#logout',
    shopItem: '.shop-item',
    addBtn: '.shop-item-button',
    cartRow: '.cart-row',
    cartTitle: '.cart-item-title',
    cartPrice: '.cart-price',
    cartQty: '.cart-quantity-input',
    totalPrice: '.cart-total-price',
    checkoutBtn: 'button.btn-purchase',
    header: '.section-header'

};

// 🔹 HELPERS
const getActiveItems = (data) => {
    return data.filter(item => item.enabled !== false);
};

const getCartItem = (name) => {
    return cy.contains(selectors.cartTitle, name)
        .closest(selectors.cartRow);
};

// 🔹 ACTION: LOGOUT
export const logout = () => {

    cy.window().then((win) => {

        win.localStorage.removeItem('token');

    });

    cy.clearCookies();

    cy.get(selectors.logoutBtn)
        .should('be.visible')
        .click();

};

// 🔹 VERIFY PAGE
export const verifyShoppingCartPage = () => {
    cy.contains(selectors.header, 'SHOPPING CART')
        .should('be.visible');
};

// 🔹 ACTION: CLICK CHECKOUT
export const checkoutBtn = (shouldClick = false) => {
    cy.contains(selectors.checkoutBtn, 'PROCEED TO CHECKOUT')
        .should('be.visible');

    if (shouldClick) {
        cy.contains(selectors.checkoutBtn, 'PROCEED TO CHECKOUT').click();
        cy.log('Checkout clicked');
    }
};

// 🔹 ACTION: PICK ITEMS
export const pickupItems = (data) => {
    const items = getActiveItems(data);

    items.forEach((item) => {
        cy.contains(selectors.shopItem, item.name)
            .should('be.visible')
            .find(selectors.addBtn)
            .click();
    });
};

// 🔹 ACTION: ADD QUANTITY
export const addQuantity = (data) => {
    const items = getActiveItems(data);

    items.forEach((item) => {
        if (!item.quantity) return;

        getCartItem(item.name)
            .find(selectors.cartQty)
            .clear()
            .type(`${item.quantity}{enter}`);
    });
};

// 🔹 ASSERT: CALCULATE TOTAL
export const calCartTotal = (data) => {
    const items = getActiveItems(data);

    let total = 0;
    let formula = [];

    items.forEach((item) => {

        getCartItem(item.name)
            .should('exist')
            .then(($row) => {

                const price = parseFloat(
                    $row.find(selectors.cartPrice).text().replace('$', '').trim()
                ) || 0;

                const qty = parseInt(
                    $row.find(selectors.cartQty).val()
                ) || 0;

                const subTotal = price * qty;

                cy.log(`${item.name}`);
                cy.log(`${price} x ${qty} = ${subTotal}`);

                formula.push(`(${price} x ${qty})`);
                total += subTotal;
            });
    });

    cy.then(() => {

        const expected = total.toFixed(2);

        cy.log(`Formula: ${formula.join(' + ')}`);
        cy.log(`Expected: ${expected}`);

        cy.get(selectors.totalPrice)
            .invoke('text')
            .then((text) => {

                const actual = text.replace('$', '').trim();

                cy.log(`Actual: ${actual}`);

                expect(parseFloat(actual))
                    .to.be.closeTo(parseFloat(expected), 0.01);
            });

        // 🔥 scroll ให้คุณตาม requirement
        cy.scrollTo('top');
    });
};

// 🔹 MAIN FLOW (ยังใช้ได้ แต่ไม่บังคับ)
export const checkoutProcess = (data) => {
    pickupItems(data);
    addQuantity(data);
    calCartTotal(data);
};

// 🔹 Remove Session
export const removeSession = () => {

    cy.window().then((win) => {

        win.localStorage.removeItem('token');

    });

};

// 🔹 Verify Session Cleared
export const verifySessionCleared = () => {

    cy.window().then((win) => {

        expect(
            win.localStorage.getItem('token')
        ).to.be.null;

    });

};

// 🔹 Mock Protected Route Access
export const verifyProtectedPageAccess = () => {

    cy.window().then((win) => {

        const token =
            win.localStorage.getItem('token');

        if (!token) {

            cy.visit('/auth_ecommerce.html');

        }

    });

};