Feature: Logowanie do Demo Bank

Scenario: Nieudane logowanie z za krótkim loginem
    Given użytkownik otwiera stronę logowania
    When użytkownik wprowadza za krótki login
    When użytkownik odznacza pole
    Then system powinien wyświetlić błąd o minimalnej długości loginu