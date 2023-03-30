#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleAppStack } from '../lib/simple-app-stack';
import { FirstPipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
new FirstPipelineStack(app, 'CdkFirstPipelineStack');