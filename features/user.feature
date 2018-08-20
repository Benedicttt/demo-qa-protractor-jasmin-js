Feature: Smoke test for SPOK project
Scenario: Create User
  Given I open in Google page Spok project
  Then the title is "SPOK"
  And find login and password inputs