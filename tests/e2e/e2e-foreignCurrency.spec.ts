import {test, expect} from '@playwright/test'

test.describe('Foreign Currency Flow', async () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.getByRole('button', {name:'Signin'}).click()
        await page.locator('#user_login').fill('username')
        await page.locator('#user_password').fill('password')
        await page.locator('text= Sign In').click()
        await page.goto('http://zero.webappsecurity.com/index.html')
    })

    test('Foreign Currency', async ({page}) => {
        await page.locator('#onlineBankingMenu').click()
        await page.locator('#pay_bills_link').click()
        await page.locator('text=Purchase Foreign Currency').click()

        await page.selectOption('#pc_currency', 'EUR')
        const conversion = await page.locator("#sp_sell_rate")
        await expect(conversion).toBeVisible()
        await expect(conversion).toContainText('euro')

        await page.fill('#pc_amount', '500')
        await page.getByRole('button', {name:"Calculate Costs"}).click()
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please, ensure that you have filled all the required fields with valid values.');
            await dialog.accept()
        });
        await page.locator('#pc_inDollars_true').check()
        await page.getByRole('button', {name:"Calculate Costs"}).click()

        const conversionFinal = await page.locator('#pc_conversion_amount')
        await expect(conversionFinal).toBeVisible()
    })
})









