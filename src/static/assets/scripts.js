"use strict";

function _templateObject3() {
  var data = _taggedTemplateLiteral(["<", " groups=", " />"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                <li key=", " class=\"search__item\">\n                  <a href=", " target=\"_blank\" class=\"search__link\">", "</a>\n                </li>\n              "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        <div class=\"search\">\n          <div class=\"search__overlay ", "\"></div>\n\n          <div class=\"search__content\">\n            <input value=", " onInput=", " class=\"search__input\" placeholder=\"search your area...\" onFocus=", " onBlur=", " />\n\n            <ul class=\"search__list ", "\">\n              ", "\n            </ul>\n          </div>\n        </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Embedded constants
 */
var FUSE_CONFIG = {
  threshold: 0.2,
  keys: [{
    name: 'title',
    weight: 2
  }, {
    name: 'body',
    weight: 1
  }]
};
/*
* Helper functions
*/

/**
 * @param {HTMLElement} menuDropdown 
 */

var initMenu = function initMenu(menuDropdown) {
  menuDropdown.classList.remove('menu__dropdown_loading');

  var changePage = function changePage(_ref) {
    var target = _ref.target;
    menuDropdown.classList.add('menu__dropdown_loading');
    window.location.href = target.value;
  };

  menuDropdown.addEventListener('change', changePage);
};
/**
 * @param {HTMLElement} search 
 */


var initSearch = function initSearch(search) {
  var html = htm.bind(preact.h); // const Card = ({ title, body, filter }) => html`
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

  var formatResults = function formatResults(results) {
    var trimmed = results.slice(0, 5);
    return trimmed.map(function (_ref2) {
      var _ref2$item = _ref2.item,
          name = _ref2$item.name,
          link = _ref2$item.link;
      return {
        name: name,
        link: link
      };
    });
  };

  var createFuse = function createFuse(groups) {
    return groups ? function () {
      return new Fuse(groups, {
        keys: ['name'],
        threshold: 0.2
      });
    } : function () {
      return {
        search: function search() {
          return [];
        }
      };
    };
  };

  var Widget = function Widget(_ref3) {
    var groups = _ref3.groups;

    var _preactHooks$useState = preactHooks.useState(''),
        _preactHooks$useState2 = _slicedToArray(_preactHooks$useState, 2),
        input = _preactHooks$useState2[0],
        setInput = _preactHooks$useState2[1];

    var _preactHooks$useState3 = preactHooks.useState(false),
        _preactHooks$useState4 = _slicedToArray(_preactHooks$useState3, 2),
        active = _preactHooks$useState4[0],
        setActive = _preactHooks$useState4[1];

    var handleSetInput = preactHooks.useCallback(function (_ref4) {
      var target = _ref4.target;
      return setInput(target.value);
    }, []);
    var triggerFocus = preactHooks.useCallback(function () {
      return setActive(true);
    }, []);
    var triggerNoFocus = preactHooks.useCallback(function () {
      return setActive(false);
    }, []);
    var fuse = preactHooks.useMemo(createFuse(groups), [groups]);
    var searchResults = formatResults(fuse.search(input));
    return html(_templateObject(), active ? 'search__overlay_active' : '', input, handleSetInput, triggerFocus, triggerNoFocus, active ? 'search__list_active' : '', searchResults.map(function (_ref5) {
      var name = _ref5.name,
          link = _ref5.link;
      return html(_templateObject2(), name, link, name);
    }));
  };

  var groups = JSON.parse(search.getAttribute('data-javascript-groups'));
  preact.render(html(_templateObject3(), Widget, groups), search);
};
/**
 * Primary side-effect
 */


var menuDropdown = document.querySelector('[data-javascript="menu__dropdown"]');
var search = document.querySelector('[data-javascript="search"]');
if (menuDropdown) initMenu(menuDropdown);
if (search) initSearch(search);