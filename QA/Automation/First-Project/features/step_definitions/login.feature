Feature: Login Feature

  Scenario: User tries to login with invalid credentials
    Given User is on the main page of "https://www.saucedemo.com"
    When User clicks the "Login" button
    Then User should see the error message "Epic sadface: Username is required"
