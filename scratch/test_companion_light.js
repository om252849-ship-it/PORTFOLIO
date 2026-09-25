const puppeteer = require('c:/Users/ind69/OneDrive/Desktop/ALL/Antigravity/omkumar-portfolio/node_modules/puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ind69\\.gemini\\antigravity-ide\\brain\\f1c5075c-b05a-4f00-85fc-8d958f66b2f6';

async function testLight() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('om_theme', 'light');
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Light Hero
  const lightHeroPath = path.join(artifactDir, 'companion_light_01_hero.png');
  await page.screenshot({ path: lightHeroPath });
  console.log('Saved:', lightHeroPath);

  // 2. Scroll to About
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const lightAboutPath = path.join(artifactDir, 'companion_light_02_about.png');
  await page.screenshot({ path: lightAboutPath });
  console.log('Saved:', lightAboutPath);

  // 3. Scroll to Projects
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const lightProjectsPath = path.join(artifactDir, 'companion_light_03_projects.png');
  await page.screenshot({ path: lightProjectsPath });
  console.log('Saved:', lightProjectsPath);

  await browser.close();
  console.log('Light Mode Verification Complete!');
}

testLight().catch(err => {
  console.error(err);
  process.exit(1);
});
