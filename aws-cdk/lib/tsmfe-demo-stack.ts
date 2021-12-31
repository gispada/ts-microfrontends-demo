import {
  Stack,
  StackProps,
  RemovalPolicy,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

const packages = ['account', 'container', 'dashboard', 'product', 'shared']

export class TsMfeDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    packages.forEach(name => {
      const bucket = new s3.Bucket(this, name, {
        versioned: false,
        removalPolicy: RemovalPolicy.DESTROY,
        publicReadAccess: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
      })

      const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, `OAI-${name}`, {
        comment: `CloudFront OAI for "tsmfe-demo/${name}"`
      })

      bucket.grantRead(originAccessIdentity)

      new cloudfront.Distribution(this, `CF-${name}`, {
        comment: `CloudFront distribution for "tsmfe-demo/${name}"`,
        httpVersion: cloudfront.HttpVersion.HTTP2,
        defaultBehavior: {
          origin: new origins.S3Origin(bucket, { originAccessIdentity }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        },
        defaultRootObject: 'index.html'
      })
    })
  }
}
