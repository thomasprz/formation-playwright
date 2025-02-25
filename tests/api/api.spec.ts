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

    test('GET REQUEST - GET User Detail', async ({request}) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = await response.json()

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe('George');
        expect(responseBody.data.last_name).toBe('Bluth');
        expect(responseBody.data.email).toBeTruthy() // Si le champ email retourne une valeur, le test passera
    })

    test('POST REQUEST - Create new user', async ({request}) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                name : 'Thomas',
                job : 'leader',
                id : 200,
            },
        })

        const responseBody = await response.json()
        console.log(responseBody)
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.id).toBe(200)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST REQUEST - Login successfully", async ({request}) => {
        const response = await request.post(`${baseUrl}/login`, {
            data : {
                email : "eve.holt@reqres.in",
                password : "cityslicka",
            }
        })
        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("POST REQUEST - Login Fail", async ({request}) => {
        const response = await request.post(`${baseUrl}/login`, {
            data : {
                email: "peter@klaven",
            }
        })
        const responseBody = await response.json()
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test("PUT REQUEST - Update user", async ({request}) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data : {
                "name": "thomasp",
                "job": "QA Testing"
            }
        })
        const responseBody = await response.json()
        console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("thomasp")
        expect(responseBody.job).toBe("QA Testing")
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("DELETE REQUEST - Delete user", async ({request}) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })
})