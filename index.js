const core = require('@actions/core');
const github = require('@actions/github');

const changelogRegexPattern = /```changelog(?<changelog>[\s\S]+)```/;

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
      for (const {user: {type}, body} of response.data) {
        if (type === 'User') {
          const found = body.match(changelogRegexPattern);
          if (found && found.groups.changelog !== null) {
            const paragraphs = found.groups.changelog.split(/\n\s*\n/);
            for (const paragraph of paragraphs) {
              core.info('* ' + paragraph.trim());
            }
          }
        }
      }
    } else {
      core.setFailed('Could not download issue comments. Request ended with ' + response.status);
    }

    core.info('Done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();