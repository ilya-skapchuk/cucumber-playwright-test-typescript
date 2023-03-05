const options = [
  "--require-module ts-node/register",
  "--require ./step_definitions/*.steps.ts",
  "--format progress",
  "--format json:cucumber_report.json"
].join(" ");

const runFeatures = ["./features/", options].join(" ");

module.exports = {
  test_runner: runFeatures,
};
