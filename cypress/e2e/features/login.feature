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

@emptypassword
Scenario: Empty password
Given user is on login page
When user login with empty passowrd
Then error message should be displayed

@emptyboth
Scenario: Empty both fields
Given user is on login page
When user login with empty both fields
Then error message should be displayed

@invalidformat
Scenario: Invalid email format
Given user is on login page
When user login with invalid email format
Then error message should be displayed

@withoutat
Scenario: Email without @
Given user is on login page
When user login with email without at
Then error message should be displayed

@leadingtrailing
Scenario: Leading/trailing spaces
Given user is on login page
When user login with leading trailing spaces
Then user should see shopping cart page

@onlyspaces
Scenario: Only spaces input
Given user is on login page
When user login with only spaces input
Then error message should be displayed

@specialchars
Scenario: Password with special characters
Given user is on login page
When user login with password with special characters
Then error message should be displayed

@unicode
Scenario: Verify unicode input
Given user is on login page
When user login with unicode credentials
Then error message should be displayed


@login @ui
Scenario: Verify company logo
Given user is on login page
Then company logo should be visible

@login @ui
Scenario: Verify email textbox
Given user is on login page
Then email textbox should be visible

@login @ui
Scenario: Verify password textbox
Given user is on login page
Then password textbox should be visible

@login @ui
Scenario: Verify password masking
Given user is on login page
When user enters password
Then password input should be masked

@login @ui
Scenario: Verify login button
Given user is on login page
Then login button should be visible and clickable

@login @ui
Scenario: Verify placeholder text
Given user is on login page
Then placeholder text should be displayed

@login @ui
Scenario: Keyboard navigation
Given user is on login page
When user navigates using keyboard tab
Then focus should move correctly between elements

@login @ui
Scenario: Copy and paste credentials
Given user is on login page
When user pastes valid credentials into login fields
Then user should see shopping cart page

@login @security
Scenario: SQL injection attempt
Given user is on login page
When user login with SQL injection payload
Then authentication should fail

@login @security
Scenario: XSS attempt
Given user is on login page
When user login with XSS payload
Then script should not execute