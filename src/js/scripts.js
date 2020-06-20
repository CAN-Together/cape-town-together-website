/*
* Helper functions
*/

/**
 * 
 */
const html = htm.bind(preact.h);

/**
 * @param {HTMLElement} menuDropdown 
 */
const initMenu = (menuDropdown) => {
  menuDropdown.classList.remove('dropdown_loading')

  const changePage = ({ target }) => {
      menuDropdown.classList.add('dropdown_loading')
      window.location.href = target.value;
  }

  menuDropdown.addEventListener('change', changePage)
};

/**
 * 
 * @param {*} groups 
 */
const createFuse = (groups) => groups ? () => new Fuse(groups, { keys: ['name'], threshold: 0.2 }) : () => ({ search: () => []});

const SearchWidget = ({ groups, startingValue }) => {
  const [input, setInput] = preactHooks.useState(startingValue || '');
  const [active, setActive] = preactHooks.useState(false);

  const handleSetInput = preactHooks.useCallback(({ target }) => setInput(target.value), [])
  const triggerFocus = preactHooks.useCallback(() => setActive(true), [])
  const triggerNoFocus = preactHooks.useCallback(() => setActive(false), [])

  const fuse = preactHooks.useMemo(createFuse(groups), [groups])
  const searchResults = fuse.search(input).slice(0, 5).map(({ item: { name, link } }) => ({ name, link }));

  return html`
    <div class="search">
      <div class="search__overlay ${active ? 'search__overlay_active' : ''}" onClick=${triggerNoFocus}></div>

      <div class="search__content">
        <div class="search__row">
          <input value=${input} name="search" onInput=${handleSetInput} class="search__input" placeholder="search your area..." onFocus=${triggerFocus} />
        </div>

        <ul class="search__list ${active ? 'search__list_active' : ''}">
          ${searchResults.map(({ name, link }) => html`
            <li key=${name} class="search__item">
              <a href=${link} target="_blank" class="search__link">${name}</a>
            </li>
          `)}
        </ul>
      </div>
    </div>
  `
}

/**
 * @param {HTMLElement} search 
 */
const initJs = (search) => {
  const groups = JSON.parse(search.getAttribute('data-javascript-groups'));
  const urlParams = new URLSearchParams(window.location.search);
  preact.render(html`<${SearchWidget} groups=${groups} startingValue=${urlParams.get('search') || ''} />`, search);
}

/**
 * @param {HTMLElement} search 
 */
const initSearch = (search) => {
  const groups = JSON.parse(search.getAttribute('data-javascript-groups'));
  const urlParams = new URLSearchParams(window.location.search);
  preact.render(html`<${SearchWidget} groups=${groups} startingValue=${urlParams.get('search') || ''} />`, search);
}

/**
 * Primary side-effect
 */

const resourceItems = document.querySelectorAll('[data-javascript="resources-item"]');
const menuDropdown = document.querySelector('[data-javascript="menu-dropdown"]');
const search = document.querySelector('[data-javascript="search"]');

if (resourceItems) initResources(resourceItems)
if (menuDropdown) initMenu(menuDropdown);
if (search) initSearch(search);