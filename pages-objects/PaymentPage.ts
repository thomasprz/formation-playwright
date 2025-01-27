import {Page, Locator, expect} from '@playwright/test'

export class PaymentPage {

    //Pay Saved Payee
    readonly page : Page
    readonly payeeSelectBox : Locator
    readonly payeeDetailButton : Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox : Locator
    readonly amountInput : Locator
    readonly dateInput : Locator
    readonly descriptionInput : Locator
    readonly submitPaymentButton : Locator
    readonly message : Locator

    //Foreign Currency
    readonly purchaseForeignCurrencyNav : Locator
    readonly currencyBox : Locator
    readonly sellRate : Locator
    readonly amountInputForeign : Locator
    readonly selectCurrencyBox : Locator
    readonly calculateCosts : Locator
    readonly conversionAmount : Locator
    readonly purchaseButton : Locator
    readonly messageSuccess : Locator

    constructor(page:Page) {
        this.page = page
    
        //Pay Saved Payee
        this.payeeSelectBox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')

        //Foreign Currency
        this.purchaseForeignCurrencyNav = page.locator('text=Purchase Foreign Currency');
        this.currencyBox = page.locator('#pc_currency')
        this.sellRate = page.locator('#sp_sell_rate')
        this.amountInputForeign = page.locator('#pc_amount')
        this.selectCurrencyBox = page.locator('#pc_inDollars_true');
        this.calculateCosts= page.locator('#pc_calculate_costs')
        this.conversionAmount = page.locator('#pc_conversion_amount');
        this.purchaseButton = page.locator('#purchase_cash');
        this.messageSuccess = page.locator('#alert_content');

    }

    async createPayment(payee:string, account:string, amount:string, date:string, description: string,){
        await this.payeeSelectBox.selectOption(payee)
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption(account)
        await this.amountInput.fill(amount)
        await this.dateInput.fill(date)
        await this.descriptionInput.fill(description)
        await this.submitPaymentButton.click()
    }

    async purchaseForeignCurrency(currency:string, amount:string){
        await this.purchaseForeignCurrencyNav.click()
        await this.currencyBox.selectOption(currency) //EUR
        await expect(this.sellRate).toContainText('1 euro (EUR)');
        await this.amountInputForeign.fill(amount)
        await this.selectCurrencyBox.click()
        await this.calculateCosts.click()
        await expect(this.conversionAmount).toContainText('dollar (USD)');
        await this.purchaseButton.click()

    }
}