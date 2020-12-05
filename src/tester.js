/**
 * This tester is trying to get content images at imgfo but still failed
 */

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // set the viewport so we know the dimensions of the screen
  await page.setViewport({ width: 800, height: 600 })

  page
    .on('console', message =>
      console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.log(message))
    .on('response', response =>
      console.log(`${response.status()} ${response.url()}`))
    .on('requestfailed', request =>
      console.log(`${request.failure().errorText} ${request.url()}`))

  // go to a page
  await page.goto('https://imgfo.com/view/?content=g%3D%3DNvbuanZnkG5p1jZuMCMTcTEuNlL1cmc2924tpzblLWcGxGFt9lembybWdi9pRlchc3L21mF30vc0LyZXNC10JjalYXZXNS9yRyYwYXZW9WNs50LsZWc2lS94NvbrLmYWNXRo5nakbibGNy9nM6L0cHaHR')

  // wait for bot detection
  await page.waitForFunction('document.querySelector(\'#xoxo\').innerText.length > 0')

  // click an random coordinat area to tell them we are a human
  await page.mouse.click(132, 103, { button: 'left' })

  // are we passed as human ?
  await page.waitForFunction('document.querySelector(\'#content-images\').childElementCount > 0')

  // wait for images loaded
  await page.waitForTimeout(20000)

  // take screenshot
  await page.screenshot({ path: 'screenshots/tester.png', fullPage: true })

  // close browser when done
  await browser.close()
})()
