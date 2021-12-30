#!/usr/bin/env node
import { config } from 'dotenv'
import * as cdk from 'aws-cdk-lib'
import { TsMfeDemoStack } from '../lib/tsmfe-demo-stack'

config() // Reading a .env file in the project root directory

const app = new cdk.App()

new TsMfeDemoStack(app, 'TsMfeDemoStack', {
  description: 'Stack for the TypeScript microfrontends demo project',
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION
  }
})
