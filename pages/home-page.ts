import { Page } from 'playwright';
import BasePage from './common-page';
import * as config from '../config.json';

export default class HomePage extends BasePage {

  private readonly LOGIN_INPUT_SELECTOR: string = 'input[name="login"]';
  private readonly PASSWORD_INPUT_SELECTOR: string = 'input[name="pass"]';
  private readonly TITLE_SELECTOR: string = "[title='Вхід на пошту']";

  constructor(page: Page) {
    super(page);
  }

  async logIn() {
    await this.page.fill(this.LOGIN_INPUT_SELECTOR, config.login);
    await this.page.fill(this.PASSWORD_INPUT_SELECTOR, config.password);
    await this.page.click(this.TITLE_SELECTOR);
  }
}