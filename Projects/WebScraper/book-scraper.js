//Bogdan Gura
const puppeteer = require('puppeteer');

(async () => {
  //Browser variable
  const browser = await puppeteer.launch({headless: true});

  //open new page in the browser
  const page = await browser.newPage();

  //go to my portfolio
  await page.goto("https://bogdangura.github.io/");

  //Take a screen shot of the page 
  await page.screenshot({path: "Projects/WebScraper/ScreenShots/myWebsite.png"});

  const grabPhoto = await page.evaluate(() => {
    const image = document.getElementById("personal-img");
    return image;
  })

  console.log(grabPhoto);

  //close browser
  await browser.close();
})();