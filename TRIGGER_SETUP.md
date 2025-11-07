# Konfiguracja triggera z projektu cypress-20251105-githubactions

## Co zostało zrobione w TYM projekcie

Dodano `repository_dispatch` trigger do workflow w `.github/workflows/cypress.yml`, który reaguje na event typu `trigger-cypress-tests`.

## Co trzeba zrobić w projekcie źródłowym

W projekcie **piotrek2018/cypress-20251105-githubactions** należy utworzyć plik workflow:

### 1. Utwórz plik `.github/workflows/trigger-cypress-tests.yml`

```yaml
name: Trigger Cypress Tests in Another Repo

on:
  push:
    paths:
      - 'cypress/**'
    branches:
      - main
      - master

jobs:
  trigger-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger repository dispatch
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.DISPATCH_TOKEN }}
          repository: piotrek2018/cypress_20251104
          event-type: trigger-cypress-tests
          client-payload: |
            {
              "source_repo": "${{ github.repository }}",
              "source_branch": "${{ github.ref_name }}",
              "source_sha": "${{ github.sha }}",
              "triggered_by": "${{ github.actor }}"
            }
```

### 2. Utwórz Personal Access Token (PAT)

1. Przejdź do GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Kliknij "Generate new token (classic)"
3. Nazwa: `Cypress Dispatch Token` (lub dowolna)
4. Uprawnienia:
   - ✅ `repo` (pełny dostęp do repozytoriów)
5. Skopiuj wygenerowany token

### 3. Dodaj token jako Secret w projekcie źródłowym

W projekcie **cypress-20251105-githubactions**:

1. Przejdź do Settings → Secrets and variables → Actions
2. Kliknij "New repository secret"
3. Name: `DISPATCH_TOKEN`
4. Secret: wklej skopiowany PAT
5. Kliknij "Add secret"

## Jak to działa

1. Po zmianach w katalogu `cypress/` w projekcie źródłowym (cypress-20251105-githubactions)
2. Uruchomi się workflow `trigger-cypress-tests.yml`
3. Wyśle on event `repository_dispatch` do tego projektu (cypress_20251104)
4. Ten projekt uruchomi testy Cypress automatycznie

## Testowanie

Po skonfigurowaniu możesz przetestować:

1. Wprowadź zmianę w katalogu `cypress/` w projekcie źródłowym
2. Zacommituj i wypchnij na branch main/master
3. Sprawdź zakładkę Actions w OYDWU projektach:
   - W źródłowym: powinien uruchomić się workflow "Trigger Cypress Tests in Another Repo"
   - W docelowym (tym): powinien uruchomić się workflow "Cypress Tests"

## Opcjonalnie: Wyświetlanie informacji o źródle triggera

Jeśli chcesz wyświetlać informacje o tym, skąd przyszedł trigger, możesz dodać krok w workflow:

```yaml
- name: Display trigger source
  if: github.event_name == 'repository_dispatch'
  run: |
    echo "Triggered by repository: ${{ github.event.client_payload.source_repo }}"
    echo "From branch: ${{ github.event.client_payload.source_branch }}"
    echo "Commit SHA: ${{ github.event.client_payload.source_sha }}"
    echo "By user: ${{ github.event.client_payload.triggered_by }}"
```
