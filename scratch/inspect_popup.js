const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to homepage...');
  await page.goto('https://jv2cwkjmob93er6t-61493739777.shopifypreview.com', {
    waitUntil: 'networkidle'
  });
  
  console.log('Waiting 8 seconds for any popups to appear...');
  await page.waitForTimeout(8000);
  
  // Take screenshot of the page
  await page.screenshot({ path: 'C:/Users/hp/Desktop/The Outset Playwright/scratch/homepage_loaded.png' });
  console.log('Screenshot saved to scratch/homepage_loaded.png');
  
  // Check for any modal or popup elements in DOM
  const bodyHtml = await page.evaluate(() => {
    const popup = document.querySelector('[data-testid="modal-form-container"]') || document.querySelector('[class*="klaviyo"]') || document.querySelector('[id*="klaviyo"]');
    return popup ? popup.outerHTML : 'No popup element found';
  });
  
  console.log('Popup elements found:\n', bodyHtml);
  
  await browser.close();
})();
