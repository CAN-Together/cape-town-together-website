/**
 * @name initMenu
 *
 * @description Adds interactive behaviour to dropdown menu navigation present
 * on all pages.
 *
 * The dropdown is disabled until the JavaScript loads, upon which it will
 * automatically navigate to the URL string in the `value` attribute in the
 * clicked `option` HTML element.
 *
 * Note that the dropdown version of the menu only shows on small viewports.
 *
 * @param {HTMLElement} menu 
 */
var initMenu = function initMenu(menu) {
  menu.classList.remove('dropdown__select_loading');
  menu.disabled = false;

  var changePage = function changePage(_ref) {
    var target = _ref.target;
    menu.classList.add('dropdown__select_loading');
    menu.disabled = true;
    window.location.href = target.value;
  };

  menu.addEventListener('change', changePage);
};

/**
 * @name initSearch
 *
 * @description Adds interactive behaviour to search input on the homepage and
 * directory pages.
 *
 * The search input is disabled until the JavaScript loads, upon which once it
 * is focused the background in blurred out with a semi-transparent dark
 * overlay. This overlay is removed by clicking outside of the input.
 *
 * A stringified array is saved in the `data-search-list` attribute in the
 * search UI component. This array is passed through the third-party
 * [Fuse](https://fusejs.io/) client-side fuzzy search library every time the
 * contents of the input field changes. The values returned from this function
 * is then used to show the matching results real-time underneath the seach
 * input field.
 *
 * @param {HTMLElement} search 
 */
var initSearch = function initSearch(search) {
  const input = search.querySelector('[data-search-input]');
  const overlay = search.querySelector('[data-search-overlay]');
  const list = search.querySelector('[data-search-list]');
  const listValues = JSON.parse(list.getAttribute('data-search-list'));

  const fuse = new Fuse(listValues, { keys: ['name'], threshold: 0.2 });

  input.disabled = false;
  input.placeholder = 'Search your area...'
 
  const state = new Proxy({
    search: '',
    focused: false,
  },
  {
    set: (obj, key, value) => {
      obj[key] = value;

      if (key === 'focused' && value === true) {
        overlay.classList.add('search__overlay_active');
        list.classList.add('search__list_active');
        return true;
      }

      if (key === 'focused') {
        overlay.classList.remove('search__overlay_active');
        list.classList.remove('search__list_active');
        return true;
      }

      if (key === 'search') {
        const results = fuse.search(value).slice(0, 5).map(({ item: { name, link } }) => ({ name, link }));

        list.innerHTML = results.map(({ name, link }) => (
          `
            <li key=${name} class="search__item">
              <a href=${link} target="_blank" class="search__link">${name}</a>
            </li>
          `
        )).join('')
        return true;
      }
    }
  })

  input.addEventListener('focus', () => { state.focused = true });
  input.addEventListener('input', ({ target: { value }}) => { state.search = value });
  overlay.addEventListener('click', () => { state.focused = false });

};

/**
 * @name initResources
 *
 * @description Adds interactive behaviour to resources page.
 *
 * All three filter dropdowns are disabled until the JavaScript loads, upon
 * which once either of them change it will update the resources that are shown
 * on the page.
 *
 * Every time a dropdown value changes all resource items are looped over and
 * their relevant data attribute values are compared against the values in the
 * dropdown - and they are then hidden or displayed depending on whether they match.
 * 
 * Note that 'any' always matches.
 *
 * @param {HTMLElement} resources 
 */
var initResources = function initResources(resources) {
  const items = resources.querySelectorAll('[data-resources="item"]');

  const state = new Proxy({
    type: 'any',
    subType: 'any',
    file: 'any',
  },
  {
    set: (obj, key, value) => {
      obj[key] = value;

      items.forEach((element) => {
        const type = element.getAttribute('data-resources-type');
        const subType = element.getAttribute('data-resources-sub-type');
        const file = element.getAttribute('data-resources-file');

        const typeMatch = obj.type === 'any' || obj.type === type;
        const subTypeMatch = obj.subType === 'any' || obj.subType === subType;
        const fileMatch =  obj.file === 'any' || obj.file === file;

        if (typeMatch && subTypeMatch && fileMatch) {
          element.classList.remove('resources__item_hidden');
        } else {
          element.classList.add('resources__item_hidden');
        }
      })

      return true;
    }
  })

  const typeFilter = resources.querySelector('[data-resources="type-filter"]');
  const subTypeFilter = resources.querySelector('[data-resources="sub-type-filter"]');
  const fileFilter = resources.querySelector('[data-resources="file-filter"]');

  typeFilter.addEventListener('change', ({ target }) => { state.type = target.value });
  subTypeFilter.addEventListener('change', ({ target }) => { state.subType = target.value });
  fileFilter.addEventListener('change', ({ target }) => { state.file = target.value });
};

/*
 * Side-effects
 */

var menu = document.querySelector('[data-menu]');
var search = document.querySelector('[data-search]');
var resources = document.querySelector('[data-resources]');

if (menu) initMenu(menu);
if (search) initSearch(search);
if (resources) initResources(resources);
