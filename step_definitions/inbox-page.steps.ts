import InboxPage from '../pages/inbox-page';
import { Then } from '@cucumber/cucumber';
import { page } from './common.steps';
import { expect } from 'chai';

let inboxPage: InboxPage;

Then('the menu options are available:', async (dataTable: { raw: () => string[][] }) => {
    const expectedOptions = dataTable.raw().map((row: string[]) => row[0]);
    const inboxPage = new InboxPage(page);
    const actualOptions = await inboxPage.getMenuOptions();
    expect(actualOptions).to.have.members(expectedOptions);
});