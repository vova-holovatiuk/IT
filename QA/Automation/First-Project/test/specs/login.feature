Feature: Login Feature

  Scenario: User tries to login with invalid credentials
    Given User is on the main page of "https://www.example.com"
    When User clicks the "Login" button
    Then User should see the error message "Invalid username or password"
