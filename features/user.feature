Feature: Smoke test for SPOK project

Scenario: Home page
  Given I open in Google page Spok project

Scenario: Sign up
  Given Go to page Sign up
  Then (Sign up) the title is "SPOK"
  And (Sign up) find login and password inputs

Scenario: Sign in
  Given Go to page Sign in
  Then (Sign in) the title is "SPOK"
  And (Sign in) find login and password inputs
