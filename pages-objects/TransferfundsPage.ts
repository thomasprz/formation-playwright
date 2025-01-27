import {expect, Page, Locator } from "@playwright/test";

export class TransferfundsPage {

    readonly page: Page
    readonly fromAccountBox : Locator
    readonly toAccountBox : Locator
    readonly amountInput : Locator
    readonly descriptionInput : Locator
    readonly clickButton : Locator
    readonly titleText : Locator
    readonly successMessage : Locator

    constructor(page:Page){
        this.page = page
        this.fromAccountBox = page.locator('#tf_fromAccountId')
        this.toAccountBox = page.locator('#tf_toAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.clickButton = page.locator('#btn_submit')
        this.titleText = page.locator('h2.board-header')
        this.successMessage = page.locator('.alert-success')
    }

    async makeTransferMoney(fromAccount:string, toAccount: string, amount: string, description: string) {
        await this.fromAccountBox.selectOption(fromAccount)
        await this.toAccountBox.selectOption(toAccount)
        await this.amountInput.fill(amount)
        await this.descriptionInput.fill(description)
        await this.clickButton.click()
        await expect(this.titleText).toContainText('Verify')
        await this.clickButton.click()
    }

}
