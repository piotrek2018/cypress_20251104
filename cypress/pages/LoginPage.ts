// cypress/pages/LoginPage.ts

import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly selectors = {
    loginInput: '[data-testid="login-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]',
    loginError: '[data-testid="error-login-id"]',
    passwordError: '[data-testid="error-login-password"]',
    bankLogo: 'a.logo.login',
  };

  constructor() {
    super("/");
  }

  enterLogin(userId: string): void {
    this.typeText(this.selectors.loginInput, userId);
  }

  enterPassword(password: string): void {
    this.typeText(this.selectors.passwordInput, password);
  }

  /**
   * Wywołaj walidację pola login (blur)
   */
  triggerLoginValidation(): void {
    cy.get(this.selectors.loginInput).blur();
  }

  /**
   * Wywołaj walidację pola hasło (blur)
   */
  triggerPasswordValidation(): void {
    cy.get(this.selectors.passwordInput).blur();
  }

  clickLoginButton(): void {
    cy.get(this.selectors.loginButton).should("not.be.disabled");
    this.clickElement(this.selectors.loginButton);
  }

  login(userId: string, password: string): void {
    this.enterLogin(userId);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  verifyLoginError(expectedMessage: string): void {
    this.verifyElementVisible(this.selectors.loginError);
    this.verifyElementContainsText(this.selectors.loginError, expectedMessage);
  }

  verifyPasswordError(expectedMessage: string): void {
    this.verifyElementVisible(this.selectors.passwordError);
    this.verifyElementContainsText(
      this.selectors.passwordError,
      expectedMessage
    );
  }

  isLoginErrorVisible(): void {
    this.verifyElementVisible(this.selectors.loginError);
  }

  isPasswordErrorVisible(): void {
    this.verifyElementVisible(this.selectors.passwordError);
  }

  verifyLoginButtonEnabled(): void {
    cy.get(this.selectors.loginButton).should("not.be.disabled");
  }

  verifyLoginButtonDisabled(): void {
    cy.get(this.selectors.loginButton).should("be.disabled");
  }

  verifyBankLogoVisible(): void {
    this.verifyElementVisible(this.selectors.bankLogo);
  }
}
