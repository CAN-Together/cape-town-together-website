require('dotenv').config()

const { promises } = require('fs');
const { resolve: resolvePath } = require('path');
const markdownIt = require('markdown-it')();
const axios = require('axios');
const faker = require('faker');
const { sections } = require('./src/data/homepage.json');

const CWD = process.cwd();
const PAGES_PATH = './src/data/pages';


/**
 * Embedded constants
 */

const GROUPS_URL = `https://api.airtable.com/v0/app68ZSxKJJR3AoCB/Groups?api_key=${process.env.AIRTABLE_AUTH_TOKEN}`;

const CLUSTERS = [
    'Community Action Networks (A-H)',
    'Community Action Networks (I-O)',
    'Network Action Issues',
    'Community Action Networks (P-Z)',
]

/*
 * Embedded helper functions
 */

/**
 * 
 */
const mockGroupsData = () => new Array(50).fill(undefined).map(() => ({
  id: faker.random.uuid(),
  createdTime: faker.date.past(),
  fields: {
    'Group Name': faker.commerce.productName(),
    Recid: faker.lorem.slug(),
    Cluster: faker.random.arrayElement(CLUSTERS),
    'Link to Contact Group': faker.internet.url(),
    'Last Modified Time': faker.date.recent(),
    'Link to sign-up as volunteer': faker.internet.url(),
  }
}))

/**
 * 
 */
const transformGroupsData = (records) => records.map(({ fields }) => {
  if (!fields["Group Name"] || !fields["Link to Contact Group"]) {
    return null
  }

  return {
    name: fields["Group Name"],
    link: fields["Link to Contact Group"],
  }
}).filter(val => !!val);


/**
 * 
 */
const recursiveApiCall = async (records, callback, offset) => {
  const URL = !offset ? GROUPS_URL : `${GROUPS_URL}&offset=${offset}`;

  const { data } = await axios.get(URL);
  data.records.forEach((item) => records.push(item))

  if (data.offset) {
    await callback(records, callback, data.offset)
  }
}

/**
 * 
 */
const getGroupsData = async () => {
  if (!process.env.AIRTABLE_AUTH_TOKEN) {
    return transformGroupsData(mockGroupsData());
  }

  let records = [];
  await recursiveApiCall(records, recursiveApiCall, null);
  return transformGroupsData(records);
}

/**
 * 
 */
const getCmsRoutes = async () => {
    const pagesPath = resolvePath(CWD, PAGES_PATH);
    const files = await promises.readdir(pagesPath);

    const array = files.map(async (file) => {
        const filePath = resolvePath(PAGES_PATH, file);
        const contentAsString = await promises.readFile(filePath, 'utf-8');
        const values = JSON.parse(contentAsString);

        return {
            ...values,
            template: './src/views/page.ejs',
            html: markdownIt.render(values.body),
            expanding: values.expanding.map((expandingItem) => ({ 
              ...expandingItem, 
              content: markdownIt.render(expandingItem.content) 
            }))
        }
    })

    return await Promise.all(array);
}

const createConfig = async () => {
  const groups = await getGroupsData();
  const cmsRoutes = (await getCmsRoutes()).filter(({ order }) => order !== 0).sort((a, b) => a.order - b.order);

  return {
    /**
     * Files that should be copied directly to build.
     *
     * This is usually where you place all non-ejs files that you want in the
     * build. If you are compiling your assets through
     * [Parcel](https://parceljs.org/), [Webpack](https://webpack.js.org/),
     * [Gulp](https://gulpjs.com/) or another asset pipeline then you should
     * also compile the results/bundles here.
     *
     * For example `./src/static/favicon.ico` will be copied as is to
     * `build/favicon.icon` and `./src/static/css/styles.css` will be copied to
     * `build/css/styles.css`
     */
    static: './src/static',

    /**
     * This is the folder where the user-facing code will be compiled to. 
     *
     * If you are using a service like [Netlify](https://www.netlify.com/) or
     * [Vercel](https://vercel.com/) then you should configure your
     * build/deployment to publish this folder. Alternatively if you are
     * manually uploading your site via [Netlify
     * Drop](https://app.netlify.com/drop), [Github
     * pages](https://pages.github.com/), [Amazon
     * S3](https://aws.amazon.com/s3/) or FTP then you should use the contents
     * of this folder.
     */
    output: './build',

    /**
     * Specify a folder that will trigger a rebuild if any files in it is
     * changed while running `millimetr develop` or  `npm run start`. 
     *
     * If you want to ignore any files/folders from trigger a rebuild then
     * specify them via the `exclude` option below.
     */
    input: './src',

    /**
     * Accepts an array of strings, globs or regular expressions (via
     * [anymatch](https://github.com/micromatch/anymatch)) that should be
     * ignored completely by millimetr when running `build` or `develop`.
     *
     * Note that this will also be applied to the contents of the `static`
     * folder.
     */
    exclude: [],

    /**
     * A global object that should automatically be exposed in all routes under
     * `millimetr.globals`.
     *
     * This is useful for any data that you want to make sure if always
     * available everywhere in your site, or fallback information if a specific
     * value is not supplied to a route.
     */
    globals: {
        language: 'en',
        title: 'Cape Town Together',
        description: 'CCT is a network of Community Action Networks responding to the Covid-19 crisis in South Africa.'
    },

    /**
     * This is where the majority of all millimetr logic sits.
     *
     * This value is array of objects used to created all routes for your site.
     * Note that each route requires both an [relative
     * URL](https://www.seoclarity.net/resources/knowledgebase/difference-relative-absolute-url-15325
     * value and a title value (used in debugging, but can also be consumed in
     * the template).
     *
     * Any additional values are passed as-is to the templates. These values can
     * be hardcoded, generated dynamically ot retrieved remotely via [await
     * JavaScript
     * operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
     */
    routes: [
      {
        url: '/',
        title: 'Homepage',
        template: './src/views/homepage.ejs',
        sections,
        groups,
      },
      {
        url: '/cans-directory',
        title: 'CANs Directory',
        template: './src/views/cans-directory.ejs',
        groups,
      },
      ...cmsRoutes,
    ],
  }
}

module.exports = createConfig;
