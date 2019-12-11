<p align="center">
  <a href="https://graasp.eu/">
    <img alt="Graasp" src="https://avatars3.githubusercontent.com/u/43075056" width="300">
  </a>
</p>

<h1 align="center">Graasp App: Rewards</h1>

<p align="center">
  Allows educators to assign rewards to learners within the Graasp ecosystem.
</p>

## Environment Variables

To start developing locally, you should create a `.env.local` file in your root folder with the
following content:

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=
REACT_APP_GRAASP_APP_ID=
REACT_APP_GRAASP_DOMAIN=localhost
REACT_APP_HOST=
REACT_APP_VERSION=
REACT_APP_BASE=
```

Once you are ready to deploy your application to our development server, you will need to create
a `.env.dev` file in your root folder following the patter below. Replace the value between `<>`
with those that you received from our developers. Please make sure you do not commit or share the
values between `<>` with anyone, as they are confidential.

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=<REACT_APP_GRAASP_DEVELOPER_ID>
REACT_APP_GRAASP_APP_ID=<REACT_APP_GRAASP_APP_ID>
REACT_APP_GRAASP_DOMAIN=graasp.eu
REACT_APP_HOST=apps.dev.graasp.eu
REACT_APP_VERSION=latest
REACT_APP_BASE=//$REACT_APP_HOST/$REACT_APP_GRAASP_DEVELOPER_ID/$REACT_APP_GRAASP_APP_ID/$REACT_APP_VERSION/
NODE_ENV=production
BUCKET=graasp-apps-dev
AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
```

Once you are ready to deploy your application to our production server, you will need to create
a `.env.prod` file in your root folder following the patter below. Replace the value between `<>`
with those that you received from our developers. Please make sure you do not commit or share the
values between `<>` with anyone, as they are confidential.

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=<REACT_APP_GRAASP_DEVELOPER_ID>
REACT_APP_GRAASP_APP_ID=<REACT_APP_GRAASP_APP_ID>
REACT_APP_GRAASP_DOMAIN=graasp.eu
REACT_APP_HOST=apps.graasp.eu
REACT_APP_VERSION=latest
REACT_APP_BASE=//$REACT_APP_HOST/$REACT_APP_GRAASP_DEVELOPER_ID/$REACT_APP_GRAASP_APP_ID/$REACT_APP_VERSION/
NODE_ENV=production
BUCKET=graasp-apps-prod
AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
```

## Installing Dependencies

Make sure you have `node` and `yarn` installed on your local machine otherwise go
[here](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) and install them;
then run `yarn` from the project directory to install all dependencies.

## Starting the Server

Navigate to the project directory using the command line, type `yarn start` and the project will
automatically run on `localhost:3000`.
