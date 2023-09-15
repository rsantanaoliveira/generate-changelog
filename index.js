const core = require('@actions/core');
const github = require('@actions/github');

async function run () {
  try {
    core.info('Executing...')

    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      per_page: 100
    });

    core.info('Setting output...');

    if (response.status === 200) {
      core.info(typeof (response.data));
    } else {
      core.setFailed('Could not download issue comments. Request ended with ' + response.status);
    }

    core.info('Done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();