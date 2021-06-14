#!/usr/bin/env node

import * as ACData from 'adaptivecards-templating'
const axios = require('axios')
const core = require('@actions/core')
// Pull in the JSON file via require because it doesn't change
// And needs to be a synchronous read
const eventData = require(process.env.GITHUB_EVENT_PATH)

const webhookUrl = core.getInput('webhook-url')
console.log(`Webhook URL: ${webhookUrl}`)
// let msg = `New PR Event: ${process.env.GITHUB_EVENT} |`
// msg += ` Repository: ${process.env.GITHUB_REPOSITORY} |`
// msg += ` Merge target: ${process.env.GITHUB_BASE_REF} |`
// msg += ` Branch to merge: ${process.env.GITHUB_HEAD_REF}`

/* eslint-disable no-template-curly-in-string */
const templateData = {
  type: 'AdaptiveCard',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      wrap: true,
      text: '${$root.title}',
      weight: 'bolder',
      size: 'medium'
    },
    {
      type: 'TextBlock',
      text: '${$root.description}',
      wrap: true
    }
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'View PR',
      url: '${$root.url}'
    }
  ]
}
/* eslint-enable no-template-curly-in-string */

const template = new ACData.Template(templateData)
const cardData = template.expand({
  $root: {
    title: `New PR for ${eventData.repository.name}`,
    description: `New pull request opened by ${eventData.pull_request.user.login}`,
    url: eventData.pull_request.html_url
  }
})

axios
  .post(webhookUrl, {
    cardData
  })
  .then(res => {
    console.log(`statusCode': ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
