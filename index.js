const core = require('@actions/core');
const {context, octokit} = require('@actions/github');

function run() {
  try {
    core.info('Executing...')

    core.info('Setting output...');
    core.setOutput('changelog-text', 'Issue number: ' + context.issue.number);

    core.info('Done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();