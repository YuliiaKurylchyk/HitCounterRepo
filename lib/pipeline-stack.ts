import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource} from 'aws-cdk-lib/pipelines';
import {DemoPipelineStage} from './pipeline-stage';

export class FirstPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        

        const connection =  CodePipelineSource.connection('YuliiaKurylchyk/HitCounterRepo', 'master',
        {
            connectionArn: 'arn:aws:codestar-connections:us-east-1:702475694110:connection/9260c345-a8c6-4a3c-83fe-7f2cf75dad06',
            triggerOnPush: true
        })


        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyFirstCdkPipeline',
            synth: new CodeBuildStep('SynthStep', {
                    input: connection,
                    installCommands: [
                        'npx npm@6 install'
                    ],
                    commands: [
                        'npm ci',
                        'npm run build',
                        'npx cdk synth'
                    ]
                }
            )
        });

        const deploy = new DemoPipelineStage(this, 'Deploy');
        const deployStage = pipeline.addStage(deploy);
    }
}