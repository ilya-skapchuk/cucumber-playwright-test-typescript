import { When, Before, After, setDefaultTimeout, Then } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';
import BasePage from '../pages/common-page';
import { expect } from 'chai';

let browser: any;
let page: Page;
let basePage: BasePage

setDefaultTimeout(10000)

When('the User click on the {string} link', async (linkText: string) => {
    await basePage.clickLinkByLinkText(linkText);
});

Then('the {string} page message should be present', async (pageText: string) => {
    const successMessage = await basePage.getLocatorByText(pageText);
    expect(successMessage.isVisible());
});

Then('the User navigated to the {string} page', async (expectedTitle: string) => {
    const actualTitle = await basePage.getPageTitle();
    expect(actualTitle).to.have.string(expectedTitle + ' -');
});

Before(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    basePage = new BasePage(page)
    await basePage.openMainPage();
});

After(async () => {
    // await browser.close();
});

export { page };