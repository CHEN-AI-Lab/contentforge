import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  expect(await page.title()).toBeTruthy()
})
