import {test, expect} from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test("Simple Basic Test", async ({page}) => {
    await page.goto('https://example.com/')
    const pageTitle = await page.locator('h1')
    await expect (pageTitle).toContainText('Example Domain')
})

test("Clickin on Elements @connexion", async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.getByRole('button', {name:"Signin"}).click()
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

/*
test('Selectors', async ({page}) => {
    //Text
    await page.click('text= some text')
    //CSS Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //Only visible CSS Selector
    await page.click('submit-button:visible')

    //Combinations
    await page.click('#username .first')

    //XPath
    await page.click("//button")
})
*/

test.describe("My first test suite", () => {

    test("Working with Input", async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.getByRole('button', {name:"Signin"}).click()
        await page.locator("#user_login").fill("Thomas")
        await page.locator('#user_password').fill("Lille")
        await page.locator('text=Sign in').click()
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertions Example', async ({ page }) => {
        await page.goto('https://example.com')
        await expect(page).toHaveURL('https://example.com')
        await expect(page).toHaveTitle('Example Domain')
        const titlePage = page.locator('h1') 
        await expect(titlePage).toBeVisible()
        await expect(titlePage).toHaveText('Example Domain')
        await expect(titlePage).toHaveCount(1)
        const nonExistingElement = page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()  
    })
})

test.describe("Hooks", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://example.com')
    })

        test('Screenshoots', async ({page}) => {
            await page.screenshot({path: "screenshoot.png", fullPage: true})
        })
        
        test('Single element screenshoot', async ({page}) => {
            const element = await page.locator('h1')
            await element.screenshot({path: "single_element_screenshoot.png"})
        })
})

test('Custom helpers', async ({ page }) => {
    await loadHomePage(page);  // Charge la page
    await assertTitle(page);   // Vérifie le titre
});