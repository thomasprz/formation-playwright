import {test, expect} from '@playwright/test'

test.describe("Visual Regression Testing Exemple", () => {
    test("Full Page Snapshot", async ({page}) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    test("Single Element Snapshot", async ({page}) => {
        await page.goto('https://www.example.com')
        //Créer une constante
        const pageElement = await page.locator("h1") 
        expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png')
    })
})