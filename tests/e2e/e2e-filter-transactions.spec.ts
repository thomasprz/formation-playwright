import {test, expect} from '@playwright/test'
import { HomePage } from '../../pages-objects/HomePage';
import { LoginPage } from '../../pages-objects/loginPage';

test.describe('Filter Transactions', () => {
  let homepage: HomePage
  let loginpage: LoginPage
  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page)
    loginpage = new LoginPage(page)
    await homepage.visit()
    await homepage.clickOnSignIn()
    await loginpage.login('username','password')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Verify the results for each account', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '2')
    const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
    await expect(checkingAccount).toHaveCount(3)

    await page.selectOption('#aa_accountId', '4')
    const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
    await expect(loanAccount).toHaveCount(2)

    await page.selectOption('#aa_accountId', '6')
    const noResults = await page.locator('.well')
    await expect(noResults).toBeVisible()
  })
})
