#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

webhook_url = core.getInput('webhook-url');
console.log(process.env);
msg = `New PR Event: ${process.env.GITHUB_EVENT} |`;
msg += ` Repository: ${process.env.GITHUB_REPOSITORY} |`;
msg += ` Merge target: ${process.env.GITHUB_BASE_REF} |`;
msg += ` Branch to merge: ${process.env.GITHUB_HEAD_REF}`;
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
