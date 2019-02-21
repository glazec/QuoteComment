const puppeteer = require("puppeteer");

test("Select text do display the menu", async function() {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 80,
    args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/glze/Documents/Program/QuoteComment/src/index.html"
  );

  // select the test
  // the coordinate is random choose
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(400, 300);
  await page.mouse.up();
  await page.mouse.move(450, 300);
  const display = await page.$eval("#highlight_menu", menu =>
    getComputedStyle(menu).getPropertyValue("display")
  );
  expect(display).toBe("block");
  //press the mouse again to disable the menu
  await page.mouse.up();
  await page.mouse.down();
  await page.waitFor(300);
  const disappear = await page.$eval("#highlight_menu", menu =>
    getComputedStyle(menu).getPropertyValue("display")
  );
  expect(disappear).toBe("none");
  await browser.close();
}, 10000);
