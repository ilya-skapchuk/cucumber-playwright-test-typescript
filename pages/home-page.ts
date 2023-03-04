import { Page } from 'playwright';
import BasePage from './common-page';

export default class HomePage extends BasePage {

  private readonly LOGIN_INPUT_SELECTOR: string = 'input[name="login"]';
  private readonly PASSWORD_INPUT_SELECTOR: string = 'input[name="pass"]';
  private readonly TITLE_SELECTOR: string = "[title='Вхід на пошту']";

  constructor(page: Page) {
    super(page);
  }

  async logIn() {
    await this.page.fill(this.LOGIN_INPUT_SELECTOR, 'test123a');//TODO: properties
    await this.page.fill(this.PASSWORD_INPUT_SELECTOR, 'test123a1');//TODO: properties
    await this.page.click(this.TITLE_SELECTOR);
  }
}