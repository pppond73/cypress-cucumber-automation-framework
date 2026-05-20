// 🔹 SELECTORS
const selectors = {
    container: 'div#shipping-address',
    header: 'h2',
    phone: 'input[name="phone"]',
    street: 'input[name="street"]',
    city: 'input[name="city"]',
    country: '#countries_dropdown_menu',
    submitBtn: 'button#submitOrderBtn'
};

// 🔹 VERIFY PAGE
export const verifyShippingPage = () => {
    cy.contains(selectors.header, 'Shipping Details')
        .should('be.visible');
};

// 🔹 FILL FORM
export const fillShippingDetails = (data) => {

    cy.get(selectors.container)
        .should('be.visible')
        .within(() => {

            // 🔥 data-driven
            if (data.phone) {
                cy.get(selectors.phone).clear().type(data.phone);
            }

            if (data.street) {
                cy.get(selectors.street).clear().type(data.street);
            }

            if (data.city) {
                cy.get(selectors.city).clear().type(data.city);
            }

            if (data.country) {
                cy.get(selectors.country).select(data.country);
                cy.wait(1000);
            }
        });
};

// 🔹 SUBMIT
export const submitShipping = () => {
    cy.get(selectors.submitBtn)
        .should('be.visible')
        .click();

    // 🔥 scroll ตาม requirement
    cy.scrollTo('top');
};

// 🔹 VALIDATION (HTML5)
export const verifyRequiredField = (selector) => {

    cy.get(selector)
        .should('exist')
        .then(($el) => {

            // invalid state
            expect($el[0].checkValidity()).to.be.false;

            // 🔥 ไม่ fix text ตายตัว
            expect($el[0].validationMessage)
                .to.include('Please');
        });
};

// 🔹 SUCCESS PAGE
export const verifyShippingSuccess = (data) => {

    const expectedAddress = `${data.street}, ${data.city} - ${data.country}`;
    cy.log(expectedAddress);
    cy.contains('Congrats!')
        .should('be.visible');

    cy.get('body')
        .should('contain.text', expectedAddress);
};