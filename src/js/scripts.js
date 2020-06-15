/*
 * Embedded constants
 */

const FUSE_CONFIG = { threshold: 0.2, 
  keys: [{
      name: 'title',
      weight: 2
  },     {
      name: 'body',
      weight: 1
  }]
}

/*
* Helper functions
*/

/**
 * @param {HTMLElement} menuDropdown 
 */
const initMenu = (menuDropdown) => {
  menuDropdown.classList.remove('menu__dropdown_loading')

  const changePage = ({ target }) => {
      menuDropdown.classList.add('menu__dropdown_loading')
      window.location.href = target.value;
  }

  menuDropdown.addEventListener('change', changePage)
};

/**
 * @param {HTMLElement} search 
 */
const initSearch = (search) => {
  const html = htm.bind(preact.h);

  // const Card = ({ title, body, filter }) => html`
  //     <span class="card">
  //       <h3 class="card__title" dangerouslySetInnerHTML=${{ __html: filter.length < 3 ? title : title.replace(new RegExp(filter, 'ig'), (match) => `<mark>${match}</mark>`)}} />
  //       <p class="card__description" dangerouslySetInnerHTML=${{ __html: filter.length < 3 ? body : body.replace(new RegExp(filter, 'ig'), (match) => `<mark>${match}</mark>`)}} />
  //     </span>
  // `

  // const useData = (url) => {
  //     const [data, setData] = preactHooks.useState(null);
      
  //     preactHooks.useEffect(() => {
  //     axios.get(url).then((response) => setData(response.data))
  //     }, [])
      
  //     return data;
  // }

  // const App = ({ url }) => {
  //   const data = useData(url);
  //   const [filter, setFilter] = preactHooks.useState('');
  //   const searchIndex = preactHooks.useMemo(() => !!data && new Fuse(data, FUSE_CONFIG), [data]);

  //   if (!data) {
  //     return html`
  //         <${preact.Fragment}>
  //         <input class="widget__input" disabled />
  //         <ul class="grid"></ul>
  //         </${preact.Fragment}>
  //     `;
  //   }

  //   const filteredData = filter.length < 3 ? data : searchIndex.search(filter).map(({ item }) => item);

  //   return html`
  //     <${preact.Fragment}>
  //         <input class="widget__input" placeholder="Filter.." value=${filter} onInput=${({ target }) => setFilter(target.value)}/>
  //         <ul class="grid">
  //         ${filteredData.map(({ title, body }) => html`
  //             <li class="grid__item">
  //             ${html`<${Card} filter=${filter} title=${title} body=${body} />`}
  //             </li>
  //         `)}
  //         </ul>
  //     </${preact.Fragment}>
  //   `
  // }

  const formatResults = (results) => {
    const trimmed = results.slice(0, 5);
    return trimmed.map(({ item: { name, link } }) => ({ name, link }));
  }

  const createFuse = (groups) => groups ? () => new Fuse(groups, { keys: ['name'], threshold: 0.2 }) : () => ({ search: () => []});

  const Widget = ({ groups }) => {
    const [input, setInput] = preactHooks.useState('');
    const [active, setActive] = preactHooks.useState(false);

    const handleSetInput = preactHooks.useCallback(({ target }) => setInput(target.value), [])
    const triggerFocus = preactHooks.useCallback(() => setActive(true), [])
    const triggerNoFocus = preactHooks.useCallback(() => setActive(false), [])

    const fuse = preactHooks.useMemo(createFuse(groups), [groups])
    const searchResults = formatResults(fuse.search(input));

    return html`
        <form class="search" method="get" action="/results">
          <div class="search__overlay ${active ? 'search__overlay_active' : ''}"></div>

          <div class="search__content">
            <div class="search__row">
              <input value=${input} name="text" onInput=${handleSetInput} class="search__input" placeholder="search your area..." onFocus=${triggerFocus} onBlur=${triggerNoFocus} />
              <button class="search__button" type="submit">Go</button>
            </div>

            <ul class="search__list ${active ? 'search__list_active' : ''}">
              ${searchResults.map(({ name, link }) => html`
                <li key=${name} class="search__item">
                  <a href=${link} target="_blank" class="search__link">${name}</a>
                </li>
              `)}
            </ul>
          </div>
      </form>
    `
  }

  const groups = JSON.parse(search.getAttribute('data-javascript-groups'));
  preact.render(html`<${Widget} groups=${groups} />`, search);
}

/**
 * Primary side-effect
 */

const menuDropdown = document.querySelector('[data-javascript="menu__dropdown"]');
const search = document.querySelector('[data-javascript="search"]');

if (menuDropdown) initMenu(menuDropdown);
if (search) initSearch(search);