import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource} from 'aws-cdk-lib/pipelines';

export class FirstPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        

        const repo = CodePipelineSource.gitHub('YuliiaKurylchyk/HitCounterRepo.git', 'master');


        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyFirstCdkPipeline',
            synth: new CodeBuildStep('SynthStep', {
                    input: repo,
                    installCommands: [
                        'npm install -g aws-cdk'
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