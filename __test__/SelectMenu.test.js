const puppeteer = require("puppeteer");

test.skip("UI test:Select text do display the menu", async function() {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/glze/Documents/Program/QuoteComment/dist/index.html"
  );

  // simulate user select the text
  // the coordinate is random choose
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(400, 300);
  await page.mouse.up();
  await page.mouse.move(450, 300);
  //get the css of the highlight menu. now the menu should display as block
  const display = await page.$eval("#highlight_menu", (menu) =>
    getComputedStyle(menu).getPropertyValue("display")
  );
  expect(display).toBe("block");
  //the menu should disappear. when the user click mouse again with nothing selected.
  await page.mouse.up();
  await page.mouse.down();
  // there is a delay in animation
  await page.waitFor(800);
  const disappear = await page.$eval("#highlight_menu", (menu) =>
    getComputedStyle(menu).getPropertyValue("display")
  );
  expect(disappear).toBe("none");
  await browser.close();
}, 10000);

test("Display the select menu", async function() {
  jest.mock("../src/sum.js");
  const sum = require("../src/sum");
  sum.mockImplementation((cb) => {
    cb(1, 2);
  });
  document.body.innerHTML =
    ' <div id="highlight_menu" style="display:none;">' +
    "</div>" +
    '<p id="textForTest">' +
    "test occupy test short" +
    "</p>";
  const $ = require("jquery");
  require("../src/SelectMenu");
  $("#textForTest").mousedown();
  $("#textForTest").mouseup();
  expect(sum).toBeCalled();
});
