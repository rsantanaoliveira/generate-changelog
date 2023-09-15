const core = require('@actions/core');

async function run() {
  try {
    core.info('starting')
    core.debug('starting debug')
    const issueNumber = core.getInput('issue-number');
    core.setOutput('changelog-text', 'The issue id is: ' + issueNumber);
    core.info('logging '+ issueNumber);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();