import {test, expect} from '@playwright/test'
import { HomePage } from '../../pages-objects/HomePage';
import { LoginPage } from '../../pages-objects/loginPage';
import { Navbar } from '../../pages-objects/components/Navbar';
import { PaymentPage } from '../../pages-objects/PaymentPage';


test.describe('Currency Exchange Form', () => {
  let homepage: HomePage
  let loginpage: LoginPage
  let paymentpage : PaymentPage
  let navbar : Navbar

    test.beforeEach(async ({ page }) => {
      homepage = new HomePage(page)
      loginpage = new LoginPage(page)
      navbar = new Navbar(page)
      paymentpage = new PaymentPage(page)

      await homepage.visit()
      await homepage.clickOnSignIn()
      await loginpage.login('username','password')
      await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    });
  
    test('Should make currency exchange', async ({page}) => {
      await navbar.clickOnTab("Pay Bills")
      await paymentpage.purchaseForeignCurrency("EUR", "5000")
      await expect(paymentpage.messageSuccess).toBeVisible();
      await expect(paymentpage.messageSuccess).toContainText('Foreign currency cash was successfully purchased');
    });
  });
  

