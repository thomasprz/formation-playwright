import {test,expect} from '@playwright/test'
import { FeedbackPage } from '../../pages-objects/FeedbackPage'
import { HomePage } from '../../pages-objects/HomePage'

test.describe.only("Feedback Form", () => {
    let homePage : HomePage
    let feedbackPage : FeedbackPage

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

        test('Reset feedback form', async ({ page }) => {
            await feedbackPage.fillForm("name", "email@gmail.com", "subject", "message")
            await feedbackPage.resetForm()
            await feedbackPage.assertResset()
        })
        
        test('Submit feedback form', async ({ page }) => {
            await feedbackPage.fillForm("name", "email@gmail.com", "subject", "message")
            await feedbackPage.submitForm()
            await feedbackPage.feedbackFormSent()
        })
  
})