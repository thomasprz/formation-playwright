import {test, expect} from '@playwright/test'
import {HomePage} from '../../pages-objects/HomePage';
import {LoginPage} from '../../pages-objects/loginPage';
import {Navbar} from '../../pages-objects/components/Navbar';
import {TransferfundsPage} from '../../pages-objects/TransferfundsPage';

test.describe('Transfer Funds and Make Payments', () => {
  let homepage: HomePage
  let loginpage: LoginPage
  let transferfundspage : TransferfundsPage
  let navbar : Navbar

    test.beforeEach(async ({ page }) => {
      homepage = new HomePage(page)
      loginpage = new LoginPage(page)
      navbar = new Navbar(page)
      transferfundspage = new TransferfundsPage(page)

      await homepage.visit()
      await homepage.clickOnSignIn()
      await loginpage.login('username','password')
      await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    });

  test('Transfer funds', async ({ page }) => {
    await navbar.clickOnTab("Transfer Funds")
    await transferfundspage.makeTransferMoney("2", "3", "500", "Test Message")
    await expect(transferfundspage.successMessage).toContainText('You successfully submitted your transaction');
  });

});
