import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages-objects/HomePage';
import { LoginPage } from '../../pages-objects/loginPage';

test.describe("Login Page Visual Tests", () => {
    let homepage: HomePage;
    let loginpage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        loginpage = new LoginPage(page);

        await homepage.visit();
        await homepage.clickOnSignIn();
    });

    test('Login Form', async ({ page }) => {
        await loginpage.snapshotLoginForm();
    });

    test('Login Error Message', async ({ page }) => {
        await loginpage.login('fail', 'invalid');
        await loginpage.snapshotErrorMessage();
    });
});