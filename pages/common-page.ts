import { Page, Locator } from 'playwright';

export default class BasePage {

    private readonly LINK_TEXT_SELECTOR_PLACEHOLDER = (linkText: string) => `//a[text()="${linkText}"]`;

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openMainPage() {
        await this.page.goto('https://i.ua');//TODO: properties
    }

    async clickLinkByLinkText(linkText: string) {
        await this.page.waitForSelector(this.LINK_TEXT_SELECTOR_PLACEHOLDER(linkText));
        await this.page.click(this.LINK_TEXT_SELECTOR_PLACEHOLDER(linkText));
    }

    async getPageTitle(): Promise<String> {
        return await this.page.title();
    }

    async getLocatorByText(text: string): Promise<Locator> {
        return this.page.getByText(text);
    }
}