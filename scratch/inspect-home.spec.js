import { test } from '@playwright/test';

test('inspect homepage content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  
  // Wait a bit and check for any popups
  await page.waitForTimeout(3000);
  
  // Let's print all headers or picture-and-content sections
  const promoBlocks = await page.locator('.picture-and-content').all();
  console.log('--- PICTURE AND CONTENT BLOCKS ---');
  for (let i = 0; i < promoBlocks.length; i++) {
    const text = await promoBlocks[i].innerText();
    console.log(`Block ${i} text:\n${text}\n-------------------`);
  }
  
  // Let's print other major sections or titles
  const h2s = await page.locator('h2').allInnerTexts();
  console.log('--- H2 TITLES ---', h2s);

  const h3s = await page.locator('h3').allInnerTexts();
  console.log('--- H3 TITLES ---', h3s);
});
