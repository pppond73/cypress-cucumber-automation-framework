beforeEach(() => {

    // 🔹 viewport
    cy.viewport(1600, 900);

    // 🔹 fixture aliases
    cy.fixture('users').as('users');

    cy.fixture('product').as('products');

    cy.fixture('address').as('address');

});