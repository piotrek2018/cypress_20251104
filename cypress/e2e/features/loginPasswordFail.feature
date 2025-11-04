Feature: Logowanie do Demo Bank

Scenario: Nieudane logowanie z za krótkim hasłem
    Given użytkownik otwiera stronę logowania
    When użytkownik wprowadza poprawną nazwę użytkownika
    When użytkownik wprowadza za krótkie hasło
    When użytkownik odznacza pole hasło
    Then system powinien wyświetlić błąd o minimalnej długości hasła
