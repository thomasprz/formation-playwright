import {test, expect} from '@playwright/test'
import {HomePage} from '../../pages-objects/HomePage';
import {LoginPage} from '../../pages-objects/loginPage';
import {PaymentPage} from '../../pages-objects/PaymentPage';
import {Navbar} from '../../pages-objects/components/Navbar';

test.describe('New Payment', () => {
    let homepage: HomePage
    let loginpage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar


  test.beforeEach(async ({ page }) => {
      homepage = new HomePage(page)
      loginpage = new LoginPage(page)
      paymentPage = new PaymentPage(page)
      navbar = new Navbar(page)

      await homepage.visit()
      await homepage.clickOnSignIn()
      await loginpage.login('username','password')
      await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

      test('Should send new payment', async ({ page }) => {
        await navbar.clickOnTab("Pay Bills")
        await paymentPage.createPayment("apple","6","5000","2021-11-09","some random message")
        await expect (paymentPage.message).toBeVisible()
        await expect (paymentPage.message).toContainText('The payment was successfully submitted')
  })
})
