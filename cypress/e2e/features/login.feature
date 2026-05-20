Feature: E-commerce Login

Scenario: Valid login
Given user is on login page
When user login with valid credentials
Then user should see shopping cart page

Scenario: Invalid email
Given user is on login page
When user login with invalid email
Then error message should be displayed

Scenario: Invalid password
Given user is on login page
When user login with invalid password
Then error message should be displayed

Scenario: Unregistered account
Given user is on login page
When user login with unregistered credentials
Then error message should be displayed

Scenario: Wrong credential combination
Given user is on login page
When user login with mismatched credentials
Then error message should be displayed

Scenario: Login by Enter key
Given user is on login page
When user press Enter after entering valid credentials
Then user should see shopping cart page

@refresh
Scenario: Refresh page after successful login
Given user is on login page
When user login with valid credentials
And user refresh browser
Then user should redirect to login page

@logout
Scenario: Logout
Given user is on login page
When user press Enter after entering valid credentials
And user logout after successful login
Then user should redirect to login page

@emptyemail
Scenario: Empty email
Given user is on login page
When user login with empty email
Then error message should be displayed