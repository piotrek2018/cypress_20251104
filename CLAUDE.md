# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cypress automation framework using BDD (Cucumber) with the Page Object Model pattern. Tests are written in Polish and target the Demo Bank application at https://demo-bank.vercel.app.

## Common Commands

### Running Tests
- `npm run cy:open` - Open Cypress Test Runner (interactive mode)
- `npm run cy:run` - Run all tests headless in Chrome
- `npm run cy:run:chrome` - Run tests in Chrome (same as above)
- `npm run cy:run:firefox` - Run tests in Firefox
- `npm run cy:run:headed` - Run tests with browser window visible

### Environment-Specific Tests
- `npm run test:dev` - Run tests against dev environment
- `npm run test:staging` - Run tests against staging environment

### Code Quality
- `npm run lint` - Check TypeScript code for linting errors
- `npm run lint:fix` - Auto-fix linting errors
- `npm run type-check` - Run TypeScript compiler type checking without emitting files

### Running Individual Tests
To run a single feature file:
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## Architecture

### BDD with Cucumber
- Feature files are located in `cypress/e2e/features/*.feature` (written in Polish/Gherkin)
- Step definitions are in `cypress/e2e/step_definitions/` and import from Page Objects
- Uses `@badeball/cypress-cucumber-preprocessor` for Cucumber support
- Spec pattern: `cypress/e2e/**/*.feature`

### Page Object Model (POM)
- All page objects extend from `BasePage` class (`cypress/pages/BasePage.ts`)
- `BasePage` provides common methods: `visit()`, `clickElement()`, `typeText()`, `verifyElementVisible()`, etc.
- Page objects use private `selectors` object for element locators (data-testid attributes)
- Page objects are instantiated in step definitions and used to interact with the UI

Example pattern:
```typescript
export class SomePage extends BasePage {
  private readonly selectors = {
    someElement: '[data-testid="some-element"]',
  };

  constructor() {
    super("/some-path");
  }

  someAction(): void {
    this.clickElement(this.selectors.someElement);
  }
}
```

### Test Data Management
- Test data stored in `cypress/fixtures/*.json`
- Access fixtures in step definitions using `cy.fixture('filename')`
- `loginData.json` contains validUser, invalidUsers (various validation scenarios), and errorMessages

### Path Aliases
TypeScript paths are configured in `tsconfig.json`:
- `@pages/*` → `cypress/pages/*`
- `@fixtures/*` → `cypress/fixtures/*`

Use these in imports for cleaner code.

### Reporting
- Uses `cypress-mochawesome-reporter` for HTML/JSON test reports
- Reports generated in `cypress/reports/` directory
- Reporter configured in `cypress.config.ts` with embedded screenshots and inline assets

### CI/CD
- GitHub Actions workflow in `.github/workflows/cypress.yml`
- Runs on push to main/master, pull requests, and manual dispatch
- Generates test reports and deploys to GitHub Pages
- Artifacts: screenshots (on failure), videos (always), test reports
- Test reports available at: https://piotrek2018.github.io/cypress_20251104/

### Configuration
Base URL: `https://demo-bank.vercel.app`
- Viewport: 1280x720
- Video recording enabled
- Screenshots on failure enabled
- Default command timeout: 10s
- Page load timeout: 30s

## Key Implementation Notes

1. **Selectors**: Always use `data-testid` attributes for element selection (pattern: `[data-testid="element-name"]`)

2. **Validation Triggering**: For form field validation, use `.blur()` to trigger validation (see `triggerLoginValidation()` in LoginPage)

3. **Step Definitions**: Step definitions should be thin - delegate all logic to Page Objects

4. **Feature Files**: Written in Polish following Gherkin syntax (Feature, Scenario, Given, When, Then)

5. **TypeScript**: Strict mode enabled, all files must pass type checking

6. **Test Isolation**: Each test should be independent - use `beforeEach` hooks in step definitions if setup is needed across scenarios
