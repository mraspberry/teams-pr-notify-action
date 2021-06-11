const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

webhook_url = core.getInput('webhook-url');
msg = "New PR Event: ${process.env.GITHUB_EVENT} |";
msg += " Repository: ${proces.env.GITHUB_REPOSITORY} |";
msg += " Merge target: ${proces.env.GITHUB_BASE_REF} |";
msg += " Branch to merge: ${process.env.GITHUB_HEAD_REF";
axios
 .post(webhook_url, {
     text: msg
 })
  .then(res => {
      console.log(`statusCode': ${res.statusCode}`)
      console.log(res)
  })
  .catch(error => {
        console.error(error)
  })
