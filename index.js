const core = require("@actions/core")

async function run() {
  try {
    //GITHUB_HEAD_REF is only set for pull request events https://docs.github.com/en/actions/reference/environment-variables
    const isPullRequest = !!process.env.GITHUB_HEAD_REF 

    let branchName
    if (isPullRequest && process.env.GITHUB_HEAD_REF) {
      branchName = process.env.GITHUB_HEAD_REF
    } else {
      if (!process.env.GITHUB_REF) {
        throw new Error("GITHUB_REF env var not set")
      }
      branchName = process.env.GITHUB_REF.replace(/refs\/heads\//g, "")
    }

    core.exportVariable("GIT_BRANCH_NAME", branchName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
