const core = require('@actions/core');

function run() {
  try {
    core.info('Executing...')

    const issueNumber = core.getInput('issue-number');
    core.info('issue-number: '+ issueNumber);

    core.info('Setting output...');
    core.setOutput('changelog-text', 'The issue id is: ' + issueNumber);

    core.info('Done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();