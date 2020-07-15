<!-- omit in toc -->
# 👪 Cape Town Together Website

<!-- omit in toc -->
## Table of Contents

- [Contribute](#contribute)
- [NPM Scripts](#npm-scripts)
- [Technologies](#technologies)

## Contribute

1. Clone the repository by running `git clone https://github.com/CAN-Together/cape-town-together-website.git`.
2. Make sure you have the latest release of [NodeJS](https://nodejs.org/en/) installed.
3. Run `npm install` in the root folder of the repository to install all dependencies.
4. Run `npm start` in the root folder to spin up a local instance of the website.

_Note that if you are using VS Code please install the [EJS Syntax plugin](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support) to get syntax highlighting._

## NPM Scripts

- `npm start`: Starts a local instance of the website with mock data.
- `npm run build`: Builds a production version of the website into the `build/` folder.

*Note that you are welcome to use Yarn too if you prefer it over the standard NPM CLI tool*

## Technologies

- The project is built on [Millimetr](https://github.com/millimetr).
- [Normalize.css](https://github.com/necolas/normalize.css) is used to resolve cross-browser inconsistencies in CSS.
- [Faker](https://www.npmjs.com/package/faker) is used to mock API calls if no `AIRTABLE_AUTH_TOKEN` is present in `.env`.
- [Axios](https://github.com/axios/axios) used to abstract away REST API calls.
- [Dotenv](https://www.npmjs.com/package/dotenv) is used to feed environment variables into build process.
- [Netlify CMS](https://www.netlifycms.org/) is used to edit/create new pages.
- [Babel](https://babeljs.io/) is used to transpile ES6+ for older browsers.
- [Proxy Polyfill](https://www.npmjs.com/package/proxy-polyfill) is used to enable the `Proxy` functionality on older browsers.
