const core = require('@actions/core');
const github = require('@actions/github');

async function run () {
  try {
    core.info('Executing...')

    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const response = await octokit.request("GET /orgs/{org}/repos", {
      org: "octokit",
      type: "private",
    });

    core.info('Setting output...');

    core.setOutput('changelog-text', response);

    core.info('Done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();