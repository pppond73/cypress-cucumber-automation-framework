export const selectors = {
    logoutBtn: '#logout',
    header: '.section-header',
    shopItem: '.shop-item',
    addBtn: '.shop-item-button',
    removeButton: '.btn-danger',
    paginationBtn: '.pagination-btn',
    cartRow: '.cart-row',
    cartItem: '.cart-items',
    cartTitle: '.cart-item-title',
    cartPrice: '.cart-price',
    cartQty: '.cart-quantity-input',
    totalPrice: '.cart-total-price',
    checkoutBtn: 'button.btn-purchase',
};

const getActiveItems = (data) => {
    return data.filter(
        item => item.enabled !== false
    );
};

const getCartItem = (productName) => {

    return cy.contains(
        selectors.cartTitle,
        productName
    ).closest(selectors.cartRow);

};

export const logout = () => {

    cy.window().then((win) => {

        win.localStorage.removeItem('token');

    });

    cy.clearCookies();

    cy.get(selectors.logoutBtn)
        .should('be.visible')
        .click();

};

export const verifyShoppingCartPage = () => {

    cy.contains(
        selectors.header,
        'SHOPPING CART'
    ).should('be.visible');

};

export const clickCheckout = () => {

    cy.contains(
        selectors.checkoutBtn,
        'PROCEED TO CHECKOUT'
    )
        .should('be.visible')
        .click();

};

export const clickPreviousPage = () => {

    cy.contains(
        selectors.paginationBtn,
        'Prev'
    )
        .should('be.visible')
        .click();

};

export const clickNextPage = () => {

    cy.contains(
        selectors.paginationBtn,
        'Next'
    )
        .should('be.visible')
        .click();

};

export const clickPageNumber = (pageNumber) => {

    cy.contains(
        selectors.paginationBtn,
        pageNumber
    )
        .should('be.visible')
        .click();

};

export const verifyActivePage = (pageNumber) => {

    cy.contains(
        selectors.paginationBtn,
        pageNumber
    )
        .should('have.class', 'active');

};

export const verifyPreviousDisabled = () => {

    cy.contains(
        selectors.paginationBtn,
        'Prev'
    )
        .should('be.disabled');

};

export const verifyNextDisabled = () => {

    cy.contains(
        selectors.paginationBtn,
        'Next'
    )
        .should('be.disabled');

};

export const pickupItem = (
    productName
) => {

    cy.get('body').then(($body) => {

        const found =
            $body.find(selectors.shopItem)
                .text()
                .includes(productName);

        if (found) {

            cy.contains(
                selectors.shopItem,
                productName
            )
                .find(selectors.addBtn)
                .click();

        } else {

            cy.contains(
                selectors.paginationBtn,
                'Next'
            )
                .should('not.be.disabled')
                .click();

            pickupItem(productName);

        }

    });

};

export const pickupItems = (
    products
) => {

    const items = getActiveItems(products);

    items.forEach((item) => {

        pickupItem(item.name);

    });

};

export const updateQuantity = (
    products
) => {

    const items = getActiveItems(products);

    items.forEach((item) => {

        if (!item.quantity) return;

        getCartItem(item.name)
            .find(selectors.cartQty)
            .clear()
            .type(`${item.quantity}{enter}`);

    });

};

export const removeItems = (
    products
) => {

    const items = Array.isArray(products)
        ? products
        : [products];

    items.forEach((item) => {

        const productName =
            item.name || item;

        getCartItem(productName)
            .find(selectors.removeButton)
            .click();

    });

};

export const verifyCartItemExists = (
    productName
) => {

    getCartItem(productName)
        .should('exist');

};

export const verifyCartItemRemoved = (
    productName
) => {

    cy.contains(
        selectors.cartTitle,
        productName
    )
        .should('not.exist');

};

export const verifyEmptyCart = () => {
    cy.get(selectors.cartItem)
        .find(selectors.cartRow)
        .should('have.length', 0);
};

export const calCartTotal = (
    products
) => {

    const items = getActiveItems(products);

    let total = 0;

    let formula = [];

    items.forEach((item) => {

        getCartItem(item.name)
            .should('exist')
            .then(($row) => {

                const price = parseFloat(
                    $row.find(selectors.cartPrice)
                        .text()
                        .replace('$', '')
                        .trim()
                ) || 0;

                const qty = parseInt(
                    $row.find(selectors.cartQty)
                        .val()
                ) || 0;

                const subTotal = price * qty;

                total += subTotal;

                formula.push(
                    `(${price} x ${qty})`
                );

                cy.log(
                    `${price} x ${qty} = ${subTotal}`
                );

            });

    });

    cy.then(() => {

        const expected =
            total.toFixed(2);

        cy.log(
            `Formula: ${formula.join(' + ')}`
        );

        cy.get(selectors.totalPrice)
            .invoke('text')
            .then((text) => {

                const actual = text
                    .replace('$', '')
                    .trim();

                expect(
                    parseFloat(actual)
                ).to.be.closeTo(
                    parseFloat(expected),
                    0.01
                );

            });

    });

};

