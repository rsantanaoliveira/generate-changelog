const core = require('@actions/core');

async function run() {
  try {
    const issueNumber = core.getInput('issue-number');
    core.setOutput('changelog-text', 'The issue id is: ' + issueNumber);
    core.info('logging '+ issueNumber);
  } catch (error) {
    core.setFailed(error.message);
  }
}