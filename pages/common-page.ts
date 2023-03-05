import { Page, Locator } from 'playwright';
import * as config from '../config.json';

export default class BasePage {

    private readonly LINK_TEXT_SELECTOR_PLACEHOLDER = (linkText: string) => `//a[text()="${linkText}"]`;
    private readonly TEXT_SELECTOR_PLACEHOLDER = (linkText: string) => `//*[contains(text(), '${linkText}')]`;

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openMainPage() {
        await this.page.goto(config.baseUrl);
    }

    async clickLinkByLinkText(linkText: string) {
        await this.page.waitForSelector(this.LINK_TEXT_SELECTOR_PLACEHOLDER(linkText));
        await this.page.click(this.LINK_TEXT_SELECTOR_PLACEHOLDER(linkText));
    }

    async takeScreenshot(): Promise<Buffer> {
        return await this.page.screenshot({ path: 'screenshots/screenshot.png' });
    }

    async getPageTitle(): Promise<String> {
        return await this.page.title();
    }

    async getLocatorByText(text: string): Promise<Locator> {
        await this.page.waitForSelector(this.TEXT_SELECTOR_PLACEHOLDER(text));
        return this.page.getByText(text);
    }
}