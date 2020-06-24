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
const RESOURCES_URL = `https://api.airtable.com/v0/applihLcZN4vyf2Vq/Resource%20Library?api_key=${process.env.AIRTABLE_AUTH_TOKEN}`;

const MIME_DISPLAY_MAP = {
  'application/pdf': 'PDF document',
  'video/mp4': 'Video material',
  'text/html': 'Video material',
  'image/jpeg': 'Graphic image',
  'image/jpg': 'Graphic image',
  'image/png': 'Graphic image',
  'image/gif': 'Graphic image',
  'audio/x-m4a': 'Audio file',
  'text/plain': 'Text document',
}

const DISPLAY_ORDER_MAP = {
  'PDF document': 0,
  'Graphic image': 1,
  'Video material': 2,
  'Audio file': 3,
  'Text document': 4,
}

const CLUSTERS = [
    'Community Action Networks (A-H)',
    'Community Action Networks (I-O)',
    'Network Action Issues',
    'Community Action Networks (P-Z)',
]

/*
 * Embedded helper functions
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

const mockResourcesData = () => new Array(50).fill(undefined).map(() => ({
  id: faker.random.uuid(),
  createdTime: faker.date.past(),
  fields: {
    Website: faker.random.boolean(),
    Name: faker.commerce.productName(),
    Category: faker.commerce.department(),
    Type: faker.commerce.department(),
    Link: faker.internet.url(),
    fileId: faker.random.uuid(),
    'Date Created': faker.date.past(),
    'Date Updated': faker.date.recent(),
    'File Name': faker.system.fileName(),
    'Sub Type': faker.hacker.noun(),
    File: [
      {
        id: faker.random.uuid(),
        url: faker.internet.url(),
        filename: faker.system.fileName(),
        size: faker.random.number(1000),
        type: faker.system.mimeType(),
        thumbnails: faker.random.boolean() ? undefined : {
          small: {
            url: `https://picsum.photos/id/${faker.random.number({ min: 1, max: 300 })}/50/40`,
            width: 50,
            height: 40,
          },
          large: {
            url: `https://picsum.photos/id/${faker.random.number({ min: 1, max: 300 })}/500/400`,
            width: 500,
            height: 400,
          }
        }
      }
    ]
  }
}))

const transformGroupsData = (records) => records.map(({ fields }) => {
  if (!fields["Group Name"] || !fields["Link to Contact Group"]) {
    return null
  }

  return {
    name: fields["Group Name"],
    link: fields["Link to Contact Group"],
  }
}).filter(val => !!val);

const transformResourcesData = (records) => records.map(({ fields }) => {
  if (!fields.Website || !fields.File) {
    return null
  }

  return {
    title: fields.Name,
    format: MIME_DISPLAY_MAP[fields.File[0].type] || '',
    preview: fields.File[0].thumbnails && fields.File[0].thumbnails.large.url,
    type: fields.Type,
    subType: fields['Sub Type'],
    url: fields.Link,
  }
}).filter(val => !!val).sort((a, b) => DISPLAY_ORDER_MAP[a.format] - DISPLAY_ORDER_MAP[b.format]);

const recursiveApiCall = async (records, callback, offset, url) => {
  const urlWithOffset = !offset ? url : `${url}&offset=${offset}`;

  const { data } = await axios.get(urlWithOffset);
  data.records.forEach((item) => records.push(item))

  if (data.offset) {
    await callback(records, callback, data.offset, url)
  }
}

const getGroupsData = async () => {
  if (!process.env.AIRTABLE_AUTH_TOKEN) {
    return transformGroupsData(mockGroupsData());
  }

  let records = [];
  await recursiveApiCall(records, recursiveApiCall, null, GROUPS_URL);
  return transformGroupsData(records);
}

const getResourcesData = async () => {
  if (!process.env.AIRTABLE_AUTH_TOKEN) {
    return transformResourcesData(mockResourcesData());
  }

  let records = [];
  await recursiveApiCall(records, recursiveApiCall, null, RESOURCES_URL);
  return transformResourcesData(records);
}

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

    return Promise.all(array);
}


const dedupeArray = (array) => Object.keys(array.reduce((result, value) => ({
  ...result,
  [value]: null,
}), {}))

const createConfig = async () => {
  const groups = await getGroupsData();
  const resources = await getResourcesData();
  const cmsRoutes = (await getCmsRoutes()).sort((a, b) => a.order - b.order);

  const resourceTypes = dedupeArray(resources.map(({ type }) => type)).sort();
  const resourceSubTypes = dedupeArray(resources.map(({ subType }) => subType)).sort();
  const resourceFormats = dedupeArray(resources.map(({ format }) => format)).sort();

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
     * In additional to the above millimetr also passes an `internals` object to
     * all templates automatically. 
     *
     * These values can be accessed via `millimetr.internals` and are as
     * follows:
     *
     * - `millimetr.internal.routes.all`: A list of all routes created by
     *   millimeter. Is an array of objects that contain `url` and `title`
     *   values. Useful for creating site navigation.
     *
     * - `millimetr.internal.routes.active`: The current route millimetr is
     *   building. Is an object that contain an `url` and `title` value. This is
     *   useful if you want to highlight the current active route via CSS.
     *
     * However, there are instances where you would want to modify these values
     * before exposing them via the above. The following (optional) callback
     * allows you to do this.
     *
     * The callback automatically passes the default `internals` object above to
     * templates as it's first argument. The callback should consume these
     * values, modify them as needed and then return the modified values.
     *
     * Note that if you want to prevent any internal values from being passed to
     * the templates then simply have the callback return `null`. 
     *
     */
    transformInternals: (internals) => ({
      ...internals,
      routes: {
          ...internals.routes,
          all: internals.routes.all.filter(({ url }) => {
            const page = cmsRoutes.find((page) => page.url === url);
            return !page || page.order !== 0;
          })
      }
    }),

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
        url: '/resources',
        title: 'Resources',
        template: './src/views/resources.ejs',
        resources,
        types: resourceTypes,
        subTypes: resourceSubTypes,
        formats: resourceFormats,
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
