import HomePage from '../pages/home-page';
import { Given } from '@cucumber/cucumber';
import { page } from './common.steps';

let homePage: HomePage;

Given('the User logged in to the system', async () => {
    homePage = new HomePage(page);
    await homePage.logIn();
});