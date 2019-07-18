const puppeteer = require('puppeteer');

const CRX = './dist';

describe('on install', () => {
  let browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: [`--disable-extensions-except=${CRX}`, `--load-extension=${CRX}`, '--user-agent=puppeteerTest'],
    });
  });

  afterEach(() => {
    browser.close();
  });

  it('opens the options page', async () => {
    await browser.waitForTarget(target => target.url() === 'chrome-extension://ahfidkanlmlkhggdgencpoanjkokcfck/options.html');
  });

  it('opens every new tab with the extension', async () => {
    const page = await browser.newPage();
    await page.goto('chrome://newtab');
    await page.waitForSelector('.panel-container');
  });
});
