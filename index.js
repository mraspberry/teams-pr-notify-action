#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');
// Pull in the JSON file via require because it doesn't change
// And needs to be a synchronous read
const event_data = require(process.env.GITHUB_EVENT_PATH);
import * as ACData from "adaptivecards-templating";
import * as AdaptiveCards from "adaptivecards";

webhook_url = core.getInput('webhook-url');
console.log(`Webhook URL: ${webhook_url}`);
msg = `New PR Event: ${process.env.GITHUB_EVENT} |`;
msg += ` Repository: ${process.env.GITHUB_REPOSITORY} |`;
msg += ` Merge target: ${process.env.GITHUB_BASE_REF} |`;
msg += ` Branch to merge: ${process.env.GITHUB_HEAD_REF}`;

template_data = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.3",
    "body": [
        {
            "type": "TextBlock",
            "wrap": true,
            "text": "${$root.title}",
            "weight": "bolder",
            "size": "medium"
        },
        {
            "type": "TextBlock",
            "text": "${$root.description}",
            "wrap": true
        }
    ],
    "actions": [
        {
            "type": "Action.OpenUrl",
            "title": "View PR",
            "url": "${$root.url}"
        }
    ]
};

template = new ACData.Template(template_data);
card_data = template.expand({
    $root: {
        title: `New PR for ${event_data.repository.name}`,
        description: `New pull request opened by ${event_data.pull_request.user.login}`,
        url: event_data.pull_request.html_url
    }
})

axios
 .post(webhook_url, {
     card_data
 })
  .then(res => {
      console.log(`statusCode': ${res.statusCode}`)
      console.log(res)
  })
  .catch(error => {
        console.error(error)
  })
