# How to contribute to this project

<!-- TOC depthFrom:2 depthTo:3 -->

- [Reporting & resolving issues](#reporting--resolving-issues)
  - [Did you find a bug?](#did-you-find-a-bug)
  - [Did you write a patch that fixes a bug?](#did-you-write-a-patch-that-fixes-a-bug)
- [Contributing to `serverous` code](#contributing-to-serverous-code)
  - [Do you intend to add a new feature or change an existing one?](#do-you-intend-to-add-a-new-feature-or-change-an-existing-one)
  - [Setting up your development environment](#setting-up-your-development-environment)
  - [Coding conventions](#coding-conventions)
  - [Running tests](#running-tests)
- [Code of Conduct](#code-of-conduct)
  - [Our Pledge](#our-pledge)
  - [Our Standards](#our-standards)
  - [Our Responsibilities](#our-responsibilities)
  - [Scope](#scope)
  - [Enforcement](#enforcement)
  - [Attribution](#attribution)

<!-- /TOC -->

## Reporting & resolving issues

### Did you find a bug?

1. Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/privacycloud/serverous/issues).
1. If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/privacycloud/serverous/issues/new). Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

### Did you write a patch that fixes a bug?

1. Open a new GitHub pull request with the patch.
1. Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.
1. Before submitting, please ensure that your changes follow the current coding conventions for this project and run the test suite including your own tests to ensure all of them pass.

## Contributing to `serverous` code

### Do you intend to add a new feature or change an existing one?

1. Open a new issue explaining the feature.
1. If the issue collects enough possitive feedback, fork the project and create a new feature branch from `master` to apply your changes.
1. Once you are ready, open a new GitHub pull request to merge your changes back into `master`.
1. Before submitting, please ensure that your changes follow the current coding conventions for this project and run the test suite including your own tests to ensure all of them pass.

#### Features we are not considering at this moment

- Add support to any other specification format than OpenAPI

### Setting up your development environment

#### `docker` & `docker-compose`

Using [`docker`](https://docker.com) and [`docker-compose`](https://docs.docker.com/compose/) is the easiest way to setup the project:

```sh
docker-compose up --build
```

The command above will create a container with all the required dependencies and start a mock server at `localhost:8080`.

#### Local types definition

In order to have access to types definition from your editor of choice, you may need to locally install depedencies by typing the following command at the root of the project:

```sh
npm install
```

### Coding conventions

[TSLint](https://palantir.github.io/tslint/) and [Prettier](https://prettier.io/) should cover most of the job here. Anyway, please ensure that your code fits the same style used in other parts of the code base.

#### Highlights

- 2 spaces for indentation (no tabs).
- Prefer `'` over `"`.
- ES6 syntax when possible.
- Use TypeScript types.
- Use semicolons.
- Trailing commas.

### Running tests

We use [`jest`](https://facebook.github.io/jest/) framework to write and run tests (check `tests/` folder). There are a couple of `npm` scripts which will help you to execute the test suite:

- `npm run test`: executes the whole test suite.
- `npm run test:watch`: uses the `--watch` flag from `jest` to watch files for changes and rerun tests related to changed files.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at developers@privacycloud.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Good Contributing Template](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
