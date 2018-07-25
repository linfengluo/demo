/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */
import puppeteer from 'puppeteer'
const ErrorLog = require('tracer').dailyfile({root: './server/logs/error/'});
const SuccessLog = require('tracer').dailyfile({root: './server/logs/success/'});
const fetch = (href, title = '', type = 'get') => {
  return new Promise(async (resolve, reject) => {
  	let config = {
		timeout: 0,
		headless: true
	}

	if (process.env.NODE_ENV === 'development' ) {
  		config.executablePath = "E:\\temp\\demo\\bookReader\\chromium\\chrome.exe"
	} else {
		config.args = ['--no-sandbox', '--disable-setuid-sandbox']
	}
    try {
		const browser = await puppeteer.launch(config);
		const page = await browser.newPage();
		await page.goto(href);
		const content = await page.content();
		await browser.close();
		resolve(content)
	} catch (err){
		ErrorLog.error(`puppeteer : ${err}`)
	}
  })

}

export default fetch
