import { Page } from 'playwright';
import BasePage from './common-page';

export default class InboxPage extends BasePage {

    private readonly MENU_OPTIONS_SELECTOR: string = '//div[@class="block_gamma folders"]//li/a';

    constructor(page: Page) {
        super(page);
    }

    async getMenuOptions(): Promise<string[]> {
        await this.page.waitForSelector(this.MENU_OPTIONS_SELECTOR);

        const options = await this.page.$$eval(
            this.MENU_OPTIONS_SELECTOR,
            (elements) => elements.map((el) => el.textContent?.replace(/^\d+\s*/, '').trim() || '')
        );
        return options;
    }
}
