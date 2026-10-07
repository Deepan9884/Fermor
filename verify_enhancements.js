const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, 'playwright-artifacts', 'after');
const BRAIN_DIR = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\e88bd03a-85fa-4bb9-9824-1bd32b2477c5\\screenshots_after';

fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
fs.mkdirSync(BRAIN_DIR, { recursive: true });

async function saveScreenshot(page, filename, options = {}) {
  const localPath = path.join(ARTIFACTS_DIR, filename);
  const brainPath = path.join(BRAIN_DIR, filename);
  await page.screenshot({ path: localPath, ...options });
  fs.copyFileSync(localPath, brainPath);
  console.log(`Saved screenshot: ${filename}`);
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    let lastPos = -1;
    for (let i = 0; i < 30; i++) {
      window.scrollBy(0, 500);
      await new Promise(r => setTimeout(r, 50));
      if (window.scrollY === lastPos) break;
      lastPos = window.scrollY;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(400);
}

async function run() {
  const browser = await chromium.launch();
  const consoleMessages = [];
  const pageErrors = [];

  console.log('--- Phase 1: Enhanced Desktop Analysis (1440x900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();

  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => pageErrors.push(err.toString()));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await autoScroll(page);

  // Check overflow
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Desktop Overflow Check:', desktopOverflow);

  // Full page screenshot
  await saveScreenshot(page, 'desktop_full_enhanced.png', { fullPage: true });

  // 1. Hero viewport
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await saveScreenshot(page, 'desktop_hero_enhanced.png');

  // Test Hero preset chip
  const presetChip = page.locator('button:has-text("₹25,000")').first();
  if (await presetChip.count() > 0) {
    await presetChip.click();
    await page.waitForTimeout(200);
    await saveScreenshot(page, 'desktop_hero_preset_clicked.png');
  }

  // 2. Manifesto section
  const manifestoEl = page.locator('#way');
  if (await manifestoEl.count() > 0) {
    await manifestoEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, 'desktop_manifesto_enhanced.png');
  }

  // 3. Understand section
  const understandEl = page.locator('#understand');
  if (await understandEl.count() > 0) {
    await understandEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, 'desktop_understand_enhanced.png');

    // Test Net worth tab
    const nwTab = page.locator('button:has-text("Net worth")');
    if (await nwTab.count() > 0) {
      await nwTab.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_understand_networth.png');
    }

    // Test Goals tab
    const goalsTab = page.locator('button:has-text("Goals")');
    if (await goalsTab.count() > 0) {
      await goalsTab.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_understand_goals.png');
    }
  }

  // 4. Ask Fermor section
  const askEl = page.locator('#ask');
  if (await askEl.count() > 0) {
    await askEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const promptBtn = page.locator('button:has-text("PPF vs SIP: which is better?")').first();
    if (await promptBtn.count() > 0) {
      await promptBtn.click();
      await page.waitForTimeout(1600);
      await saveScreenshot(page, 'desktop_ask_answered_enhanced.png');
    }
  }

  // 5. Invest section
  const investEl = page.locator('#invest');
  if (await investEl.count() > 0) {
    await investEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const etfTab = page.locator('button:has-text("ETFs & Gold")');
    if (await etfTab.count() > 0) {
      await etfTab.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_invest_etf_enhanced.png');
    }

    const mfTab = page.locator('button:has-text("Mutual funds")');
    if (await mfTab.count() > 0) {
      await mfTab.click();
      await page.waitForTimeout(200);
      const scheduleBtn = page.locator('button:has-text("Schedule SIP with UPI Autopay")');
      if (await scheduleBtn.count() > 0) {
        await scheduleBtn.click();
        await page.waitForTimeout(250);
        await saveScreenshot(page, 'desktop_invest_scheduled.png');
      }
    }
  }

  // 6. Forecast section
  const forecastEl = page.locator('#forecast');
  if (await forecastEl.count() > 0) {
    await forecastEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const inflationBtn = page.locator('button:has-text("Adjust for 6% Inflation?")');
    if (await inflationBtn.count() > 0) {
      await inflationBtn.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_forecast_inflation_enhanced.png');
    }
  }

  // 7. Calculators section
  const calcEl = page.locator('#calculators');
  if (await calcEl.count() > 0) {
    await calcEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const emiTab = page.locator('button:has-text("Home Loan EMI")');
    if (await emiTab.count() > 0) {
      await emiTab.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_calculators_emi_enhanced.png');
    }

    const taxTab = page.locator('button:has-text("Income Tax (Budget 2024)")');
    if (await taxTab.count() > 0) {
      await taxTab.click();
      await page.waitForTimeout(250);
      await saveScreenshot(page, 'desktop_calculators_tax_enhanced.png');
    }
  }

  // 8. Kids & FAQ
  const kidsEl = page.locator('#kids');
  if (await kidsEl.count() > 0) {
    await kidsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, 'desktop_kids_faq_enhanced.png');
  }

  // 9. CTA Waitlist
  const ctaEl = page.locator('#cta');
  if (await ctaEl.count() > 0) {
    await ctaEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.count() > 0) {
      await emailInput.fill('deepan@example.com');
      await page.locator('button:has-text("Join Waitlist")').click();
      await page.waitForTimeout(300);
      await saveScreenshot(page, 'desktop_cta_waitlist_success.png');
    }
  }

  await desktopContext.close();

  console.log('--- Phase 2: Enhanced Tablet Analysis (768x1024) ---');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(600);
  await autoScroll(tabletPage);

  const tabletOverflow = await tabletPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Tablet Overflow Check:', tabletOverflow);
  await saveScreenshot(tabletPage, 'tablet_full_enhanced.png', { fullPage: true });
  await tabletContext.close();

  console.log('--- Phase 3: Enhanced Mobile Analysis (390x844 - iPhone 14) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await autoScroll(mobilePage);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Mobile Overflow Check:', mobileOverflow);
  await saveScreenshot(mobilePage, 'mobile_full_enhanced.png', { fullPage: true });
  await saveScreenshot(mobilePage, 'mobile_hero_enhanced.png');

  // Test mobile drawer
  const menuButton = mobilePage.locator('button[aria-label="Open menu"], button[aria-label="Menu"]').first();
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(300);
    await saveScreenshot(mobilePage, 'mobile_drawer_opened_enhanced.png');
  }

  await mobileContext.close();
  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    desktopOverflow,
    tabletOverflow,
    mobileOverflow,
    consoleMessages,
    pageErrors,
  };

  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'verification_report.json'), JSON.stringify(report, null, 2));
  console.log('Verification completed successfully! All screenshots and reports saved.');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
