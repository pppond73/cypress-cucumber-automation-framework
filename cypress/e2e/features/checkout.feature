Feature: Checkout

    Background:
        Given user already logged in


    Scenario: Checkout with one item

        Given user has one item in cart
        When user clicks checkout
        Then user should navigate to shipping page


    Scenario: Checkout with multiple items

        Given user has multiple items in cart
        When user clicks checkout
        Then user should navigate to shipping page


    Scenario: Checkout with no item

        When user clicks checkout
        Then system should show required validation


    Scenario: Shipping with invalid address

        Given user has one item in cart
        And user clicks checkout
        When user submits invalid shipping address
        Then system should show required validation


    Scenario: Shipping with valid address

        Given user has one item in cart
        And user clicks checkout
        When user submits valid shipping address
        Then order should be successful


    @remove
    Scenario: Remove item from cart

    When user pickup one item
    And user removes product "Dior J'adore"
    Then product "Dior J'adore" should be removed


    Scenario: Remove multiple items from cart

        Given user has multiple items in cart
        When user removes multiple products
        Then cart should be empty


    Scenario: Update product quantity

        Given user has multiple items in cart
        When user updates product quantity
        Then cart total should update correctly
