/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pages/LoginPage";

const loginPage = new LoginPage();

Given("użytkownik otwiera stronę logowania", () => {
  loginPage.visit();
});

When("użytkownik wprowadza poprawne dane logowania", () => {
  cy.fixture("loginData").then((data) => {
    const validUser = data.validUser;
    loginPage.login(validUser.userId, validUser.userPassword);
  });
});

Then("użytkownik powinien być zalogowany", () => {
  cy.url().should("not.eq", Cypress.config("baseUrl") + "/");
});

When("użytkownik wprowadza za krótki login", () => {
  cy.fixture("loginData").then((data) => {
    const invalidUser = data.invalidUsers.tooShortUsername;
    loginPage.enterLogin(invalidUser.userId);
  });
});

When("użytkownik odznacza pole identyfikator", () => {
  loginPage.triggerLoginValidation();
});

Then("system powinien wyświetlić błąd o minimalnej długości loginu", () => {
  cy.fixture("loginData").then((data) => {
    const errorMsg = data.errorMessages.usernameMinLength;
    loginPage.verifyLoginError(errorMsg);
  });
});

When("użytkownik wprowadza poprawną nazwę użytkownika", () => {
  cy.fixture("loginData").then((data) => {
    const validUser = data.validUser;
    loginPage.enterLogin(validUser.userId);
  });
});

When("użytkownik wprowadza za krótkie hasło", () => {
  cy.fixture("loginData").then((data) => {
    const invalidUser = data.invalidUsers.tooShortPassword;
    loginPage.enterPassword(invalidUser.userPassword);
  });
});

When("użytkownik odznacza pole hasło", () => {
  loginPage.triggerPasswordValidation();
});

Then("system powinien wyświetlić błąd o minimalnej długości hasła", () => {
  cy.fixture("loginData").then((data) => {
    const errorMsg = data.errorMessages.passwordMinLength;
    loginPage.verifyPasswordError(errorMsg);
  });
});
