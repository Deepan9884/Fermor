const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, 'playwright-artifacts', 'before');
const BRAIN_DIR = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\e88bd03a-85fa-4bb9-9824-1bd32b2477c5\\screenshots_before';

fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
fs.mkdirSync(BRAIN_DIR, { recursive: true });

async function saveScreenshot(page, filename, options = {}) {
  const localPath = path.join(ARTIFACTS_DIR, filename);
  const brainPath = path.join(BRAIN_DIR, filename);
  await page.screenshot({ path: localPath, ...options });
  fs.copyFileSync(localPath, brainPath);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  const browser = await chromium.launch();
  const consoleMessages = [];
  const pageErrors = [];

  console.log('--- Phase 1: Desktop Analysis (1440x900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();

  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => pageErrors.push(err.toString()));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check for horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Desktop Overflow Check:', desktopOverflow);

  // Full page desktop
  await saveScreenshot(page, 'desktop_full.png', { fullPage: true });

  // Hero section viewport
  await saveScreenshot(page, 'desktop_hero.png');

  // Test Hero sliders
  console.log('Testing Hero interactions...');
  const sipSlider = page.locator('input[type="range"]').first();
  if (await sipSlider.count() > 0) {
    await sipSlider.fill('25000');
    await page.waitForTimeout(300);
    await saveScreenshot(page, 'desktop_hero_after_slider.png');
  }

  // Scroll to Understand section
  const understandSection = page.locator('#understand, [data-section="understand"], section').nth(2);
  await understandSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_understand.png');

  // Scroll to Ask section
  const askSection = page.locator('text=Ask Fermor, or try a prompt').locator('..');
  // Alternatively scroll by percentage
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_ask.png');

  // Test Ask Fermor click prompt
  const samplePrompt = page.locator('button:has-text("PPF vs SIP"), button:has-text("Nifty 50"), button:has-text("tax")').first();
  if (await samplePrompt.count() > 0) {
    await samplePrompt.click();
    await page.waitForTimeout(1500);
    await saveScreenshot(page, 'desktop_ask_answered.png');
  }

  // Scroll to Invest section
  await page.evaluate(() => window.scrollTo(0, 2800));
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_invest.png');

  // Scroll to Forecast section
  await page.evaluate(() => window.scrollTo(0, 3800));
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_forecast.png');

  // Scroll to Calculators section
  await page.evaluate(() => window.scrollTo(0, 4800));
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_calculators.png');

  // Test calculator tab switch (e.g. Income Tax or EMI)
  const emiTab = page.locator('button:has-text("Home Loan EMI"), button:has-text("EMI")').first();
  if (await emiTab.count() > 0) {
    await emiTab.click();
    await page.waitForTimeout(400);
    await saveScreenshot(page, 'desktop_calculators_emi.png');
  }

  const taxTab = page.locator('button:has-text("Income Tax"), button:has-text("Tax (FY 24-25)")').first();
  if (await taxTab.count() > 0) {
    await taxTab.click();
    await page.waitForTimeout(400);
    await saveScreenshot(page, 'desktop_calculators_tax.png');
  }

  // Scroll to FAQ & Footer
  await page.evaluate(() => window.scrollTo(0, 6200));
  await page.waitForTimeout(500);
  await saveScreenshot(page, 'desktop_faq_footer.png');

  // Test FAQ accordion
  const faqItem = page.locator('button:has-text("How does Fermor make money?"), button:has-text("safe"), button:has-text("free")').first();
  if (await faqItem.count() > 0) {
    await faqItem.click();
    await page.waitForTimeout(300);
    await saveScreenshot(page, 'desktop_faq_expanded.png');
  }

  await desktopContext.close();

  console.log('--- Phase 2: Tablet Analysis (768x1024) ---');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(500);

  const tabletOverflow = await tabletPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Tablet Overflow Check:', tabletOverflow);
  await saveScreenshot(tabletPage, 'tablet_full.png', { fullPage: true });
  await tabletContext.close();

  console.log('--- Phase 3: Mobile Analysis (390x844 - iPhone 14) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Mobile Overflow Check:', mobileOverflow);
  await saveScreenshot(mobilePage, 'mobile_full.png', { fullPage: true });
  await saveScreenshot(mobilePage, 'mobile_hero.png');

  // Test mobile navigation drawer
  const menuButton = mobilePage.locator('button[aria-label="Toggle menu"], button:has-text("Menu"), nav button').last();
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(400);
    await saveScreenshot(mobilePage, 'mobile_nav_opened.png');
  }

  await mobileContext.close();
  await browser.close();

  // Save report
  const analysisReport = {
    timestamp: new Date().toISOString(),
    desktopOverflow,
    tabletOverflow,
    mobileOverflow,
    consoleMessages,
    pageErrors,
  };

  fs.writeFileSync(
    path.join(ARTIFACTS_DIR, 'analysis_report.json'),
    JSON.stringify(analysisReport, null, 2)
  );
  console.log('Analysis completed! Report saved.');
}

run().catch(err => {
  console.error('Playwright analysis failed:', err);
  process.exit(1);
});
