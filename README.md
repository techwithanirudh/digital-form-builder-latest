# XGov Digital Form Builder | Requires Node 12.0.0 | NVM | Check Prerequisites

[![Gitter](https://badges.gitter.im/XGovFormBuilder/Public.svg)](https://gitter.im/XGovFormBuilder/Public?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This repository is forked from [DEFRA's digital form builder](https://github.com/XGovFormBuilder/digital-form-builder).

> DEFRA's digital form builder is a metadata-driven framework that builds on our robust,
enterprise backend tech stack and the new gov.uk frontend Design System and allows form based gov.uk sites to be easily
built using a graphical design tool.

## contributions

Issues and pull requests are welcome. Please check [CONTRIBUTING.md](./CONTRIBUTING.md) first!

This repository is a mono repo for

- @xgovformbuilder/[runner](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/runner) - Hapi server which can 'run' a form from a JSON file
- @xgovformbuilder/[designer](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/designer) - A React app to aide in form building
- @xgovformbuilder/[model](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/model) - Serves the data model and other helpers

The repos are forked from [DEFRA's digital form builder](https://github.com/DEFRA/digital-form-builder).

This is a (getting close to) zero-install yarn 2 workspaces repository. .yarnrc.yml allows us to align our yarn environments. Please commit any plugins in .yarn, but do not commit your .yarn/cache. CI will save and restore the caches.

Workspaces will deal with sym-linking the packages, so we do not have to manually run `yarn link`.
It will also deal with hoisting the node_modules for any packages that are shared between the repos, thus decreasing any install times. Hopefully it all just works™️.

Also see the individual repo README files for additional info:

- [runner README](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/runner/README.md)
- [designer README](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/designer/README.md)
- [model README](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/model/README.md)


## Getting started

### Prerequisites
- Install Node.js v12.0.0

Instructions to install using NVM.
- Go to [NVM Linux/Mac Github](https://github.com/nvm-sh/nvm)
- Go to [NVM Windows Github](https://github.com/coreybutler/nvm-windows)

Installing Node 12.0.0
- Open terminal
- Type nvm
- Then type nvm install 12.0.0
- If linux or mac type sudo nvm use 12.0.0 in windows open an admin cmd and run nvm use 12.0.0

Installing Yarn 2.0
- If you already have existing versions of yarn please remove them. (npm uninstall -g yarn)
- You can install yarn by opening a terminal window and typing (npm install -g yarn)
- Set version to 2.0.0 by running (yarn set version 2)

### Setup

**Always run scripts from the root directory.**

1. Make sure you are using node >=12. upto 14 (Means 13.9.9). `node --version`.
3. Make sure you have yarn 1.22+ installed. You do not need to install yarn 2.4+, yarn will detect the yarn 2 binary within [.yarn](./.yarn) and that will be used.
4. If using the designer:
   - Note that the designer requires the runner to be running with the default `NODE_ENV=development` settings (see [runner/config/development.json](https://github.com/XGovFormBuilder/digital-form-builder/tree/main/runner/config/development.json)) to enable posting and previewing of forms during design.
5. Run `$ yarn` command to install all dependencies in all workspaces.
6. Run `$ yarn build` to build all workspaces (this is needed because dependencies can depend on each other).

As already mentioned, **always run scripts from the root directory.** because workspaces don't have scripts or packages you need to run from inside their folders and by running in the root directory yarn 2 can resolve the scripts/packages properly.

To learn more about workspaces, check these links:

- [Workspaces in Yarn](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
- [Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
### I want to...

#### run a specific workspaces' script

`$ yarn [runner|designer|model] name-of-script`

eg.: `yarn designer start` or `yarn runner add babel-core --dev`

#### run a script for each of the workspaces

`$ yarn workspaces foreach run name-of-script`

#### watch and build for changes across all repos

I wouldn't recommend it unless you have a beefy processor.

`$ yarn watch`

#### add a dependency to all workspaces

`$ yarn add packagename`

#### create a new workspace

1. create a new directory for the workspace and yarn init it
   1. `$ mkdir myNewLib`
   2. `$ cd myNewlib`
   3. `$ yarn init`
2. in the root `package.json`
   1. add `myNewLib` to the `workspaces` object.

## Troubleshooting

If you have any problems, submit an issue or send a message via gitter.

### Error: ENOENT: no such file or directory, scandir 'xxx/node_modules/node-sass/vendor'

`/vendor` is not present since it hasn't been built or rebuilt. You may also get this issue with `core-js`, `fsevents`, `nodemailer` etc.
`$ yarn rebuild` to rebuild all the packages
`$ yarn rebuild only node-sass` to rebuild just node-sass

### CI

We're using GitHub actions to run our CI process. View [a visualisation of the workflow here](https://lucid.app/lucidchart/invitations/accept/inv_74e30928-4106-49da-b75c-7a6291b225f4).

#### Versioning

Version numbers will automatically increment based on commit messages and SemVer (Major.Minor.Patch). When merging, prepend your merge commit with the following:

- `major:` or `breaking:` - for example, `breaking: removing feature X`. This will increment the MAJOR version - for example: 1.1.0 to 2.0.0
- `minor:` or `feature:` - for example, `feature: new component`. This will increment the MINOR version - for example: 1.1.0 to 1.2.0
- `patch:` or `fix:` - for example, `fix: url bug` - this will increment the PATCH version - for example: 1.0.0 to 1.0.1 (this will also happen by default)

#### Development environment

The development workflow is triggered whenever a PR is merged into main, and you can monitor it on the repository's [action tab](https://github.com/XGovFormBuilder/digital-form-builder/actions).

The workflow contains two separate jobs that run in parallel, one for the Runner and another for the Designer application.

Both jobs work as follows:

1. Build the docker image with all dependencies.
2. Push image to Heroku Container Registry.
3. Release the latest image.

The latest releases will be running here: [Runner](https://digital-form-builder-runner.herokuapp.com) / [Designer](https://digital-form-builder-designer.herokuapp.com).

### Smoke tests

A suite of smoke tests are run against all PRs. There is a Cron Job that executes smoke tests against the Heroku deployments and is scheduled to run at midnight every day.

To run the smoke tests locally, you start the containers up using the command

```
docker-compose up --build
```

Then smoke test can be executed using command

```
yarn smoke-tests/designer smoke-test-headless
```

Pre-requite for running smoke test are:

1.  Yarn
2.  JVM
3.  a browser like chrome
4.  Node version 12+ upto 14
5.  yarn install

More details are on [Smoke Tests](./smoke-tests/README.md)
