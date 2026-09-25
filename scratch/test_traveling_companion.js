const puppeteer = require('c:/Users/ind69/OneDrive/Desktop/ALL/Antigravity/omkumar-portfolio/node_modules/puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ind69\\.gemini\\antigravity-ide\\brain\\f1c5075c-b05a-4f00-85fc-8d958f66b2f6';

async function testTravelingCompanion() {
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

  // Force dark mode
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('om_theme', 'dark');
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Hero state (Character on right side)
  await page.mouse.move(720, 450);
  await new Promise(r => setTimeout(r, 400));
  const heroPath = path.join(artifactDir, 'companion_01_hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved:', heroPath);

  // 2. Scroll partially (user scroll like in their screenshot) to test seamless transition between Hero and About
  console.log('Testing seamless transition between Hero and About...');
  await page.evaluate(() => {
    window.scrollTo({ top: 500, behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 800));
  const seamlessTransitionPath = path.join(artifactDir, 'companion_02_seamless_transition.png');
  await page.screenshot({ path: seamlessTransitionPath });
  console.log('Saved:', seamlessTransitionPath);

  // 3. Scroll to About section (Character swoops to the left side)
  console.log('Scrolling to About Section...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));

  // Move mouse to top-right to test head tracking
  await page.mouse.move(1200, 200);
  await new Promise(r => setTimeout(r, 500));
  const aboutPath = path.join(artifactDir, 'companion_03_about.png');
  await page.screenshot({ path: aboutPath });
  console.log('Saved:', aboutPath);

  // 4. Test clicking to trigger 360 spin & shockwave
  console.log('Testing click reaction (shield shockwave & 360 spin)...');
  await page.mouse.click(720, 450);
  await new Promise(r => setTimeout(r, 200)); // capture mid-shockwave
  const clickReactionPath = path.join(artifactDir, 'companion_04_click_reaction.png');
  await page.screenshot({ path: clickReactionPath });
  console.log('Saved:', clickReactionPath);
  await new Promise(r => setTimeout(r, 600));

  // 5. Scroll to Projects (Character on right side above Bento cards)
  console.log('Scrolling to Projects Section...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));

  // Hover over the first project card
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

  const projectsPath = path.join(artifactDir, 'companion_05_projects.png');
  await page.screenshot({ path: projectsPath });
  console.log('Saved:', projectsPath);

  // 6. Scroll to Contact (Character centers above contact form)
  console.log('Scrolling to Contact Section...');
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const contactPath = path.join(artifactDir, 'companion_06_contact.png');
  await page.screenshot({ path: contactPath });
  console.log('Saved:', contactPath);

  await browser.close();

  console.log('--- TEST RESULTS ---');
  console.log('Console Errors found:', consoleErrors.length, consoleErrors);
  console.log('Traveling Companion Test Completed Successfully!');
}

testTravelingCompanion().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
