const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const asyncRetry = require('async-retry');

const crawlImages = async (req, res) => {
    try {
        console.log("Ashutosh singh");
//         console.log(req)
      let crawlingUrl = req.params.webLink;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(crawlingUrl);
    await asyncRetry(async () => {
      await page.goto(crawlingUrl);
    }, { retries: 3 });

    const htmlContent = await page.content();
console.log(htmlContent);
    const $ = cheerio.load(htmlContent);
    const imageUrls = [];
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });
    // await page.waitForTimeout(50000);
    res.json({ imageUrls });
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  crawlImages,
};

// const puppeteer = require('puppeteer');

// const crawlImagesFromNetwork = async (req, res) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const requests = [];

//     await page.setRequestInterception(true);
//     const url = 'https://www.pexels.com/';
    
//     page.on('request', (request) => {
//       requests.push({
//         url: request.url(),
//         method: request.method(),
//       });
//       request.continue();
//     });

//     page.on('response', (response) => {
//       requests.push({
//         url: response.url(),
//         method: response.request().method(),
//         resourceType: response.request().resourceType(),
//       });
//     });
  
//     await page.goto(url);
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     await page.waitForTimeout(50000);
//     // You now have the URLs of all images requested during page load
//     console.log(requests);

//     await browser.close();
//     res.json({ requests });

//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   crawlImagesFromNetwork,
// };
