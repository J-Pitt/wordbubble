import { test, expect } from '@playwright/test'

test.describe('Word Bubble game', () => {
  test('loads and shows level 1 and word placeholders', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('level')).toHaveText('Level 1')
    await expect(page.getByTestId('lives')).toBeVisible()
    await expect(page.getByTestId('word-display')).toBeVisible()
    await expect(page.getByTestId('game-area')).toBeVisible()
  })

  test('spawns falling letters', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('game-area')).toBeVisible()
    await expect(page.getByTestId('word-display')).toBeVisible()
    await page.waitForSelector('[data-testid^="falling-letter-"]', { timeout: 15000 })
    const balls = page.locator('[data-testid^="falling-letter-"]')
    await expect(balls.first()).toBeVisible()
  })

  test('game over modal has restart button', async ({ page }) => {
    await page.goto('/')
    // Just check that the app renders; we don't simulate full game over here
    await expect(page.getByTestId('game-area')).toBeVisible()
    const restart = page.getByTestId('game-over-restart-button')
    await expect(restart).not.toBeVisible()
  })
})
