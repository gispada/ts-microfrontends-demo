import {
  Stack,
  StackProps,
  RemovalPolicy,
  custom_resources,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

const packages = ['container', 'account', 'dashboard', 'product', 'shared'] as const

type RemotesMap = Record<typeof packages[number], { url: string }>

export class TsMfeDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const resources = packages.map(name => createS3BucketAndCloudFrontDistribution(this, name))

    const remotesMap = resources.reduce((acc, { name, distribution }) => ({
      ...acc,
      [name]: { url: `${distribution.domainName}/remoteEntry.js` }
    }), {} as RemotesMap)

    resourceStringToS3(this, 'WriteRemotesMapToS3', {
      content: JSON.stringify(remotesMap),
      key: 'remotesMap.json',
      bucket: resources[0].bucket // Store remotes map in the container's bucket for now
    })
  }
}

function createS3BucketAndCloudFrontDistribution<T extends string>(scope: Construct, id: T) {
  const bucket = new s3.Bucket(scope, id, {
    versioned: false,
    removalPolicy: RemovalPolicy.DESTROY,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    cors: [
      {
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }
    ]
  })

  const originAccessIdentity = new cloudfront.OriginAccessIdentity(scope, `OAI-${id}`, {
    comment: `CloudFront OAI for "tsmfe-demo/${id}"`
  })

  bucket.grantRead(originAccessIdentity)

  const distribution = new cloudfront.Distribution(scope, `CF-${id}`, {
    comment: `CloudFront distribution for "tsmfe-demo/${id}"`,
    httpVersion: cloudfront.HttpVersion.HTTP2,
    defaultBehavior: {
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      origin: new origins.S3Origin(bucket, { originAccessIdentity }),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
      originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN
    },
    defaultRootObject: 'index.html',
    // Handle single page app
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html'
      }
    ]
  })

  return { name: id, bucket, distribution }
}

type ResourceString = {
  content: string,
  key: string,
  bucket: s3.Bucket,
  contentType?: string
}

// Write a string to an S3 bucket, at the specified key
// https://github.com/aws/aws-cdk/issues/12903#issuecomment-920397916
function resourceStringToS3(scope: Construct, id: string, params: ResourceString) {
  const { content, key, bucket, contentType = 'application/json' } = params

  return new custom_resources.AwsCustomResource(scope, id, {
    onUpdate: {
      service: 'S3',
      action: 'putObject',
      parameters: {
        Body: content,
        Bucket: bucket.bucketName,
        Key: key,
        ContentType: contentType
      },
      physicalResourceId: custom_resources.PhysicalResourceId.of(Date.now().toString()),
    },
    onDelete: {
      service: 'S3',
      action: 'deleteObject',
      parameters: {
        Bucket: bucket.bucketName,
        Key: key
      }
    },
    policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
      resources: [`${bucket.bucketArn}/${key}`],
    })
  })
}
