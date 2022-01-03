import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createS3BucketAndCloudFrontDistribution, resourceStringToS3 } from './helpers'

const packages: tsmfe.Package[] = [
  { name: 'container', cors: true },
  { name: 'account' },
  { name: 'dashboard' },
  { name: 'product' },
  { name: 'shared' }
]

/**
 * This stack is made up of multiple S3 buckets with CloudFront, one for each package.
 * In addition, a map with the location (url) of every `remoteEntry.js` file
 * is created and uploaded to the container bucket.
 * This map is then used to dynamically fetch remotes in production.
 */
export class TsMfeDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const resources = packages.map(
      ({ name, ...rest }) => createS3BucketAndCloudFrontDistribution(this, name, rest)
    )

    const remotesMap = resources.reduce((acc, { name, distribution }) => ({
      ...acc,
      [name]: { url: `https://${distribution.domainName}/remoteEntry.js` }
    }), {} as tsmfe.RemotesMap)

    resourceStringToS3(this, 'WriteRemotesMapToS3', {
      content: JSON.stringify(remotesMap),
      key: 'remotesMap.json',
      bucket: resources[0].bucket // Store remotes map in the container's bucket for now
    })
  }
}
