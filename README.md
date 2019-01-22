# Graasp App Badges

This is an application that allows educators to assign badges to learners
within the Graasp ecosystem.

## Getting Started

Fork this repo.

## Environment Variables

Create a file in your project root named `.env` and add the following lines, replacing the values
between `<>` with the keys you received.

```
GRAASP_DEVELOPER_ID=<YOUR_GRAASP_DEVELOPER_ID>
GRAASP_APP_ID=<YOUR_GRAASP_APP_ID>
AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
```

## Setup Development Environment

Once you have set up your `.env` file, you need to run `./scripts/setup.sh` from the root folder in
order to setup your credentials. This script will write the appropriate credentials to a
`~/.aws/credentials` file that will allow you to deploy your application to the ecosystem.


## Installing Dependencies

Make sure you have `node` and `yarn` installed on your local machine otherwise go
[here](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) and install them; then run `yarn` from the project directory to install all dependencies.

## Starting the Server

Navigate to the cloned or forked project directory using the command line, type `npm start` and the project will automatically run on `localhost:3000`.
