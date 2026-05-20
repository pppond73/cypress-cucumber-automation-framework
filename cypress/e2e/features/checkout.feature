Feature: E-commerce Checkout

Scenario: Checkout product
Given user is on login page
And login with valid credentials
When user selects product and checkout
Then user should navigate to shipping page


Scenario: Shipping with invalid address
Given user is on login page
And user login with valid credentials
When user selects product and checkout
And submits invalid shipping address
Then system should show required field validation


Scenario: Shipping with valid address
Given user is on login page
And user login with valid credentials
When user selects product and checkout
And submits valid shipping address
Then order should be successful