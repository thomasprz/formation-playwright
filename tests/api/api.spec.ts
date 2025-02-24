import {test, expect, request} from '@playwright/test'


test.describe("API Testing", () => {
    const baseUrl = 'https://reqres.in/api'

    test('Simple API Test - Assert Response Status', async ({request}) => {
        const response = await request.get(`${baseUrl}/users/2`) //${baseUrl} : Permet d'insérer la valeur de la variable baseUrl directement dans la chaîne de caractères. On n'utilise ${} pour insérer des variables dans une chaîne de caractères
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({request}) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })
})