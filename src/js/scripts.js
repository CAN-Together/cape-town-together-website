"use strict";

/**
 * @name initMenu
 * 
 * @description TODO Add description
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
 * @description TODO Add description
 * 
 * @param {HTMLElement} search 
 */


var initSearch = function initSearch(search) {
  console.log('fire');
};

/**
 * @name initResources
 * 
 * @description TODO Add description
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
        }

        element.classList.add('resources__item_hidden');
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