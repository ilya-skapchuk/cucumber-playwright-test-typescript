const reporter = require("cucumber-html-reporter");
const options = {
  theme: "bootstrap",
  jsonFile: "cucumber_report.json",
  output: "cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "0.3.2",
    "Test Environment": "STAGING",
    Parallel: "Scenarios",
    Executed: "Remote",
  },
};

reporter.generate(options);
