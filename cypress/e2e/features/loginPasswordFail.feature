Feature: Logowanie do Demo Bank

    Scenario: Nieudane logowanie z za krótkim hasłem
        Given użytkownik otwiera stronę logowania
        When użytkownik wprowadza poprawną nazwę użytkownika
        And użytkownik wprowadza za krótkie hasło
        And użytkownik odznacza pole hasło
        Then system powinien wyświetlić błąd o minimalnej długości hasła
