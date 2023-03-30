import { SimpleAppStack } from './simple-app-stack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DemoPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new SimpleAppStack(this, 'WebService');
    }
}