# TypeScript microfrontends with Webpack Module Federation

A monorepo project to experiment with microfrontends, using TypeScript and Webpack Module Federation.

The application is made up of five modules:
- **Container** - The shell with the header and the side panel; it handles the top level routes.
- **Account** - A basic account section, written in React; it has two subroutes.
- **Dashboard** - A section to display random data using charts and a table; it is written in React and has three subroutes, one of which is another microfrontend.
- **Product** - A Vue 3 simple application that shows details on the items listed in the Dashboard table.
- **Shared** - Shared components and utils; it exposes both React and Vue components that are consumed by the previous frontends.

## Deployment

Each microfrontend is deployed to a separate Amazon S3 Bucket, with a CloudFront distribution in front of it.

The initial setup of AWS resources is done through **AWS CDK**, installed globally.

The first time CDK must be installed and bootstrapped:
1. `npm install -g aws-cdk`
2. `export CDK_NEW_BOOTSTRAP=1 && cdk bootstrap aws://{AWS_ACCOUNT}/{AWS_REGION}`

Then, to create the infrastucture: `cdk deploy`; to destroy it: `cdk destroy`.

Pushing on `main`, a GitHub Action will build and deploy the modified microfrontend(s) to the appropriate AWS resource(s).
