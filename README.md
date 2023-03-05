# Cucumber Playwright Test TypeScript

This is an example project that uses Cucumber, Playwright, and TypeScript for end-to-end testing.

## Installation
Clone the repository:

```sh
git clone https://github.com/ilya-skapchuk/cucumber-playwright-test-typescript.git
```

Install the dependencies:

```sh
cd cucumber-playwright-test-typescript
``` 
```sh
npm ci
```
this will install all the dependencies from the `packege-lock.json` file or:
```sh
npm install
```
to install the latest dependencies.

## Running the tests
To run the tests, use the npm test command:

```sh
npm test
```
This will run all the tests that are tagged with `@demo`. (See `scripts` section in the `package.json` to see/update `test` phase script if needed.)

## Adding new features
To add a new feature, create a new `.feature` file in the `features` directory, and implement the corresponding step definitions in the `step_definitions` directory. You can use existing step definitions as examples.

## Adding new step definitions
To add a new step definition, create a new `.ts` file in the `step_definitions` directory, and implement the step definition function using the `Given`, `When`, or `Then` functions from Cucumber. You can use existing step definition files as examples.

## Page object hierarchy and adding new pages
This project uses a simple page object hierarchy for organizing the page objects. Each page object is defined in its own TypeScript class and placed in the `pages` folder. All pages inherit from a base page object class. The base class contains common methods for interacting with web pages, such as navigating to a URL, waiting for an element to appear, and taking screenshots.

To add a new page object, create a new TypeScript class that inherits from the base page object class, and implement the methods that are specific to that page. You can use existing page objects as examples.

## Screenshot Comparison
This project uses screenshot comparison to ensure that the UI of the tested pages has not changed unexpectedly. Baseline screenshots are taken from the `baseline_png` folder and are used to compare against the screenshots that are generated during the test execution. This generated screenshots are saved into the `screenshots` folder as a `screenshot.png` for debug convenience. A diff screenshot that highlights the differences between the two screenshots is generated and saved in the `screenshots` folder as well as a `diff.png`.

To perform the comparison, this project uses `pngjs` and `pixelmatch` packages. These packages analyze the difference between two screenshots pixel by pixel and calculate a percentage difference. If the difference is above the threshold - the test fails. The threshold is defined in `config.json` and is set to `0.1` by default.

## Config file
This project uses a `config.json` file for storing configuration options, such as the base URL of the web application, browser headless mode, timeouts, etc. You can modify the `config.json` file to suit your needs.

## Reporting
This project uses the `cucumber-html-reporter` package for generating HTML reports of the test results. The reports are saved in the `root` directory after each test run. You can view the reports by opening the `cucumber_report.html` file in a web browser after tests execution.

## Credentials
The `config.json` file contains test credentials that are not sensitive, and thus it is exposed publicly in this repository. However, in case you need to store sensitive credentials, it is recommended to use the **[dotenv](https://www.npmjs.com/package/dotenv)** library. `dotenv` allows you to store sensitive data in a separate `.env` file and access them via environment variables, which are not exposed publicly.

To use `dotenv`, you should create an `.env` file in the root of the project and add your sensitive credentials in this file:
Make sure to add the `.env` file to your `.gitignore` file to prevent it from being committed to the repository.





