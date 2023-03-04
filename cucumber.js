//require: ['./step_definitions/*.steps.ts']

const options = [
  "--require-module ts-node/register",
  "--require ./step_definitions/*.steps.ts",
  "--format progress",
].join(" ");

const runFeatures = ["./features/", options].join(" ");

module.exports = {
  test_runner: runFeatures,
};
