'use strict';

const puppeteer = require('puppeteer');

const PATH = 'https://transportes.live';

const SIZES = [
  { width: 1024, height: 800, resolution: 1 },
  { width: 1920, height: 1080, resolution: 1 }
];

const build = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(PATH);

  // console.log(await page.content());
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
};

build();
