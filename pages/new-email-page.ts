import BasePage from './common-page';
import { Locator, Page, ElementHandle } from 'playwright';
import { v4 as uuidv4 } from 'uuid';
import * as config from '../config.json';

export default class NewEmailPage extends BasePage {

    private readonly ADDRESSEE_LABEL_SELECTOR: string = "//span[@title='адресна книга' and text()='Кому:']";
    private readonly ADDRESSEE_INPUT_FIELD_SELECTOR: string = "textarea[id='to']";
    private readonly SUBJECT_LABEL_SELECTOR: string = "Тема:";
    private readonly SUBJECT_INPUT_FIELD_SELECTOR: string = "//input[@name='subject']";
    private readonly MAIN_TEXTAREA_SELECTOR: string = "//textarea[@id='text']";
    private readonly SEND_BUTTONS_SELECTOR: string = "//input[@name='send' and @value='Надіслати']";
    private readonly EMAIL_TEXT: string = "ILLIA SKAPCHUK Playwright";

    constructor(page: Page) {
        super(page);
    }

    async fillNewEmailFields() {
        const ToAddress = config.email;
        const uniqueSubject: string = uuidv4();

        const toAddressInputFieldLocator = await this.getToAddresInputFieldLocator();
        await toAddressInputFieldLocator.fill(ToAddress);

        const subjectInputFieldLocator = await this.getSubjectInputFieldLocator();
        await subjectInputFieldLocator.fill(uniqueSubject);

        const mainTextAreaLocator = await this.getMainTextAreaLocator();
        await mainTextAreaLocator.fill(this.EMAIL_TEXT);
    }

    async clickSendButton() {
        const sendButtonsLocators = await this.getSendButtonsLocators();
        const sendButtonLocator = sendButtonsLocators[0];

        const isButtonEnabled = await sendButtonLocator.isEnabled();
        if (isButtonEnabled) {
            await sendButtonLocator.click();
        } else {
            throw new Error('Send button is disabled and cannot be clicked!');
        }
    }

    async getToAddresLabelLocator(): Promise<Locator> {
        return this.page.locator(this.ADDRESSEE_LABEL_SELECTOR);
    }

    async getToAddresInputFieldLocator(): Promise<Locator> {
        return this.page.locator(this.ADDRESSEE_INPUT_FIELD_SELECTOR);
    }

    async getSubjectLabelLocator(): Promise<Locator> {
        return this.page.getByText(this.SUBJECT_LABEL_SELECTOR)
    }

    async getSubjectInputFieldLocator(): Promise<Locator> {
        return this.page.locator(this.SUBJECT_INPUT_FIELD_SELECTOR)
    }

    async getMainTextAreaLocator(): Promise<Locator> {
        return this.page.locator(this.MAIN_TEXTAREA_SELECTOR)
    }

    async getSendButtonsLocators(): Promise<ElementHandle[]> {
        await this.page.waitForSelector(this.SEND_BUTTONS_SELECTOR);
        return this.page.$$(this.SEND_BUTTONS_SELECTOR);
    }
}