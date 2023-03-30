import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource} from 'aws-cdk-lib/pipelines';

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
                        'npm install -g aws-cdk',
                        'npm i -g npm@latest'
                    ],
                    commands: [
                        'npm ci',
                        'npm run build',
                        'npx cdk synth'
                    ]
                }
            )
        });
    }
}