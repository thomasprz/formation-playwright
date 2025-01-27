import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages-objects/loginPage'
import { HomePage } from '../../pages-objects/HomePage' // Importer la page object

test.describe("Login/Logout Flow", () => {
    let loginPage: LoginPage // Création d'une variable pour la page object
    let homePage : HomePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page) // Initialisation ( de préférence le positionner dans before Hook car il sera accessible dans tous les tests en dessous)
        homePage = new HomePage(page)
        await homePage.visit()
    })

    test('Negative Scenario for login', async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)
        await expect(loginPage.errorMessage).toContainText('Login and/or password are wrong')
    })
    
    test('Positive Scenario for login', async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

})
