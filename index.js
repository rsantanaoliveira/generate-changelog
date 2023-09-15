const core = require('@actions/core');

async function run() {
  try {
    const issueId = core.getInput('issue-id');
    core.setOutput('changelog-text', 'The issue id is: ' + issueId);
  } catch (error) {
    core.setFailed(error.message);
  }
}