Feature: Logowanie do Demo Bank

  Scenario: Pomyślne logowanie z poprawnymi danymi
    Given użytkownik otwiera stronę logowania
    When użytkownik wprowadza poprawne dane logowania
    Then użytkownik powinien być zalogowany
