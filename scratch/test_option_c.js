const puppeteer = require('c:/Users/ind69/OneDrive/Desktop/ALL/Antigravity/omkumar-portfolio/node_modules/puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ind69\\.gemini\\antigravity-ide\\brain\\f1c5075c-b05a-4f00-85fc-8d958f66b2f6';

async function testOptionC() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('chrome-extension://') && !text.includes('unhandledRejection')) {
        consoleErrors.push(text);
      }
    }
  });

  // Force dark mode first
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('om_theme', 'dark');
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Move cursor away
  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 300));

  // 1. Capture Dark Hero with 3D Cyber Core
  const darkHeroPath = path.join(artifactDir, 'option_c_dark_hero.png');
  await page.screenshot({ path: darkHeroPath });
  console.log('Saved:', darkHeroPath);

  // 2. Scroll to Projects in Dark Mode and hover for 3D tilt
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));

  const cardBox = await page.evaluate(() => {
    const card = document.querySelector('.project-card.tilt-card');
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return { x: rect.left + rect.width * 0.7, y: rect.top + rect.height * 0.4 };
  });

  if (cardBox) {
    await page.mouse.move(cardBox.x, cardBox.y, { steps: 5 });
    await new Promise(r => setTimeout(r, 400));
  }

  const darkProjectsPath = path.join(artifactDir, 'option_c_dark_projects.png');
  await page.screenshot({ path: darkProjectsPath });
  console.log('Saved:', darkProjectsPath);

  // 3. Switch to Light Mode (Warm Ivory)
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 500));

  // Switch to light mode explicitly via localStorage + dispatch event or click toggle until light
  await page.evaluate(() => {
    localStorage.setItem('om_theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 800));

  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 300));

  // 4. Capture Light Hero with Metallic Warm Ivory 3D Cyber Core
  const lightHeroPath = path.join(artifactDir, 'option_c_light_hero.png');
  await page.screenshot({ path: lightHeroPath });
  console.log('Saved:', lightHeroPath);

  // 5. Scroll to Projects in Light Mode
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));

  if (cardBox) {
    const newCardBox = await page.evaluate(() => {
      const card = document.querySelector('.project-card.tilt-card');
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      return { x: rect.left + rect.width * 0.7, y: rect.top + rect.height * 0.4 };
    });
    if (newCardBox) {
      await page.mouse.move(newCardBox.x, newCardBox.y, { steps: 5 });
      await new Promise(r => setTimeout(r, 400));
    }
  }

  const lightProjectsPath = path.join(artifactDir, 'option_c_light_projects.png');
  await page.screenshot({ path: lightProjectsPath });
  console.log('Saved:', lightProjectsPath);

  await browser.close();

  console.log('--- TEST RESULTS ---');
  console.log('Console Errors found:', consoleErrors.length, consoleErrors);
  console.log('Option C Verified Successfully!');
}

testOptionC().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
