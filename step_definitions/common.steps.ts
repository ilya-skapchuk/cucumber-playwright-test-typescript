import { When, Before, After, setDefaultTimeout, Then, Status } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';
import BasePage from '../pages/common-page';
import { expect } from 'chai';
import * as config from '../config.json';

let browser: any;
let page: Page;
let basePage: BasePage

setDefaultTimeout(10000)

When('the User click on the {string} link', async (linkText: string) => {
    await basePage.clickLinkByLinkText(linkText);
});

Then('the {string} page message should be present', async (pageText: string) => {
    const successMessage = await basePage.getLocatorByText(pageText);
    expect(await successMessage.isVisible(), `The '${pageText}' text is not visible on the page!`).to.be.true;
});

Then('the User navigated to the {string} page', async (expectedTitle: string) => {
    const actualTitle = await basePage.getPageTitle();
    expect(actualTitle).to.have.string(expectedTitle + ' -');
});

Before(async () => {
    browser = await chromium.launch({ headless: config.browser_headles });
    page = await browser.newPage();
    basePage = new BasePage(page)
    await basePage.openMainPage();
});

After(async function (scenario) {
    if (scenario && scenario.result && scenario.result.status === Status.FAILED) {
        await this.attach(await page.screenshot({
            path: `./screenshots/${scenario.pickle.name}.png`, fullPage: true,
        }), 'image/png');
    }
    // Close the browser
    await browser.close();
});

export { page };