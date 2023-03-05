import NewEmailPage from '../pages/new-email-page';
import { When, Then } from '@cucumber/cucumber';
import { page } from './common.steps';
import { expect } from 'chai';
import * as fs from 'fs';
import { compareScreenshots } from '../utils/utils';
import * as config from '../config.json';

let newEmailPage: NewEmailPage;

When('the User fills all required information for the letter', async () => {
    newEmailPage.fillNewEmailFields();
});

When('the User clicks "Надіслати"', async () => {
    newEmailPage.clickSendButton();
});

Then('the "Створити листа" page is displayed properly', async () => {
    newEmailPage = new NewEmailPage(page);

    //compare screenshots
    const baselineScreenshot = await fs.promises.readFile('baseline_png/new-email-page-baseline.png');
    const newScreenshot = await newEmailPage.takeScreenshot();
    const result = await compareScreenshots(baselineScreenshot, newScreenshot, config.png_comparision_threshold);
    expect(result, 'Screenshots are not identical!').to.be.true;

    //verify all needed elements to send email is visible and enabled
    const toAddresLabelLocator = await newEmailPage.getToAddresLabelLocator();
    expect(await toAddresLabelLocator.isVisible(), 'To address label is not visible!').to.be.true;

    const toAddresInputFieldLocator = await newEmailPage.getToAddresInputFieldLocator();
    expect(await toAddresInputFieldLocator.isVisible(), 'To address input field is not visible!').to.be.true;
    expect(await toAddresInputFieldLocator.isVisible(), 'To address input field is not enabled!').to.be.true;

    const subjectLabelLocator = await newEmailPage.getSubjectLabelLocator();
    expect(await subjectLabelLocator.isVisible(), 'Subject label is not visible!').to.be.true;

    const subjectInputFieldLocator = await newEmailPage.getSubjectInputFieldLocator();
    expect(await subjectInputFieldLocator.isVisible(), 'Subject input field is not visible!').to.be.true;
    expect(await subjectInputFieldLocator.isVisible(), 'Subject input field is not enabled!').to.be.true;

    const mainTextAreaLocator = await newEmailPage.getMainTextAreaLocator();
    expect(await mainTextAreaLocator.isVisible(), 'Main textarea is not visible!').to.be.true;
    expect(await mainTextAreaLocator.isVisible(), 'Main textarea is not enabled!').to.be.true;

    const getSendButtonLocators = await newEmailPage.getSendButtonsLocators();
    expect(getSendButtonLocators.length).equal(2);
    getSendButtonLocators.forEach(async (button) => {
        expect(await button.isVisible(), 'Send button is not visible!').to.be.true;
        expect(await button.isEnabled(), 'Send button is not enabled!').to.be.true;
    });
});