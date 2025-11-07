/// <reference types="cypress" />

import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pages/LoginPage";

const loginPage = new LoginPage();

Then("logo banku powinno być widoczne", () => {
  loginPage.verifyBankLogoVisible();
});
