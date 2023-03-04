import NewEmailPage from '../pages/new-email-page';
import { When, Then } from '@cucumber/cucumber';
import { page } from './common.steps';
import { expect } from 'chai';

let newEmailPage: NewEmailPage;

When('the User fills all required information for the letter', async () => {
    newEmailPage.fillNewEmailFields();
});

When('the User clicks "Надіслати"', async () => {
    newEmailPage.clickSendButton();
});

Then('the "Створити листа" page is displayed properly', async () => {
    newEmailPage = new NewEmailPage(page);

    const toAddresLabelLocator = await newEmailPage.getToAddresLabelLocator();
    expect(toAddresLabelLocator.isVisible());

    const toAddresInputFieldLocator = await newEmailPage.getToAddresInputFieldLocator();
    expect(toAddresInputFieldLocator.isVisible());
    expect(toAddresInputFieldLocator.isEnabled());

    const subjectLabelLocator = await newEmailPage.getSubjectLabelLocator();
    expect(subjectLabelLocator.isVisible());

    const subjectInputFieldLocator = await newEmailPage.getSubjectInputFieldLocator();
    expect(subjectInputFieldLocator.isVisible());
    expect(subjectInputFieldLocator.isEnabled());

    const mainTextAreaLocator = await newEmailPage.getMainTextAreaLocator();
    expect(mainTextAreaLocator.isVisible());
    expect(mainTextAreaLocator.isEnabled());

    const getSendButtonLocators = await newEmailPage.getSendButtonsLocators();
    expect(getSendButtonLocators.length).equal(2);
    getSendButtonLocators.forEach(async (button) => {
        expect(await button.isVisible()).to.be.true;
        expect(await button.isEnabled()).to.be.true;
    });
});