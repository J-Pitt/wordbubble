import { test, expect } from '@playwright/test'

test.describe('Word Bubble game', () => {
  test('landing page has Play button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('landing')).toBeVisible()
    await expect(page.getByTestId('start-game-button')).toBeVisible()
  })

  test('loads and shows level 1 after Play', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-game-button').click()
    await expect(page.getByTestId('game-area')).toBeVisible()
    await expect(page.getByTestId('level')).toHaveText('1 / 50')
    await expect(page.getByTestId('lives')).toBeVisible()
    await expect(page.getByTestId('word-display')).toBeVisible()
  })

  test('spawns falling letters after start', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-game-button').click()
    await expect(page.getByTestId('game-area')).toBeVisible()
    await page.waitForSelector('[data-testid^="falling-letter-"]', { timeout: 15000 })
    const balls = page.locator('[data-testid^="falling-letter-"]')
    await expect(balls.first()).toBeVisible()
  })

  test('game over modal has restart button', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('start-game-button').click()
    await expect(page.getByTestId('game-area')).toBeVisible()
    const restart = page.getByTestId('game-over-restart-button')
    await expect(restart).not.toBeVisible()
  })
})
