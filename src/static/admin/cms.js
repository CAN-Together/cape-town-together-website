CMS.registerPreviewStyle('/assets/normalize.css');
CMS.registerPreviewStyle('/assets/styles.css');

const html = htm.bind(h);

const Icon = ({ type }) => {
  if (type === 'hand') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="252" cy="299" r="244" fill="#b2d8ce" />
        <path d="M384.1 113.1l-26.8 123.5c.6 2.2.9 4.6.8 7v106.2c-.6 14.9-15.8 72.3-28 79.6v100.3c-25.1 8.6-52 13.3-80.1 13.3-28.3 0-55.4-4.8-80.7-13.7V426.8l-33.6-44.3c-10.2-13.4-18.5-28.1-24.7-43.7l-35.9-62c-6.8-12.8-13.9-38.1-1.4-45.3 4.2-2.5 8.9-3.6 13.5-3.6 9.5 0 18.8 5.1 23.7 14l36.2 54.3c3.5 6.4 10.1 10.3 17.2 10.4L161 199.1h.2L140.2 81l-.9-5.3c-1.8-10.2 5.9-19.8 17.3-21.3 1.1-.2 2.2-.2 3.3-.2 8.4 0 15.9 4.5 19.1 11.4.6 1.4 1.1 2.8 1.4 4.3l22.7 128.7c.6 3.3 3.3 5.9 6.6 6.3h.9c4.2 0 7.6-3.4 7.6-7.7V28.5c0-11 9-20.6 20-20.5 5.4 0 10.3 2.3 13.8 5.8 3.6 3.6 5.8 8.6 5.8 14v175.9c0 3.9 2.9 7.2 6.8 7.6l5.2.6c4.4.5 8.3-2.8 8.5-7.1l9-147 .1-1.9c.6-10.3 9.5-18.1 19.7-17.5 9.9.6 17.5 8.8 17.5 18.6v1.2l-.5 8.2-8.8 143.5c-.3 4.1 2.7 7.6 6.8 8.1l3.3.4 24.5-112.8c2-9.4 11.3-15.4 20.8-13.4 8.2 1.8 13.8 9 13.8 17.1 0 1.3-.1 2.5-.4 3.8z" fill="#7aaca0" />
      </svg>
    `;
  }

  if (type === 'clipboard') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="250" cy="299" r="244" fill="#b2d8ce"/>
        <path fill="#7aaca0" d="M385.3 65.9h-38.5l.8-13.3h-19.3V39H173.8v13.6h-18.1l.8 13.3h-42.1c-16.5 0-29.9 13.4-29.9 29.9v390.4c0 16.5 13.4 29.9 29.9 29.9h270.9c16.5 0 29.9-13.4 29.9-29.9V95.7c0-16.5-13.4-29.8-29.9-29.8zm-5.1 404.8c0 8.3-6.8 15.1-15.1 15.1H138.2c-8.3 0-15.1-6.8-15.1-15.1V115.9c0-8.3 6.8-15.1 15.1-15.1h20.4l.7 12.1H344l.7-12.1h20.4c8.3 0 15.1 6.8 15.1 15.1v354.8z" />
        <path fill="#7aaca0" d="M354.9 224.6H147.3c-6.3 0-11.5-5.1-11.5-11.5 0-6.3 5.1-11.5 11.5-11.5h207.6c6.3 0 11.5 5.1 11.5 11.5-.1 6.3-5.2 11.5-11.5 11.5zM354.9 297H147.3c-6.3 0-11.5-5.1-11.5-11.5 0-6.3 5.1-11.5 11.5-11.5h207.6c6.3 0 11.5 5.1 11.5 11.5-.1 6.3-5.2 11.5-11.5 11.5zM354.9 369.4H147.3c-6.3 0-11.5-5.1-11.5-11.5 0-6.3 5.1-11.5 11.5-11.5h207.6c6.3 0 11.5 5.1 11.5 11.5-.1 6.3-5.2 11.5-11.5 11.5z" />
      </svg>
    `;
  }

  if (type === 'shield') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="252" cy="299" r="244" fill="#b2d8ce" />
        <path d="M408.7 94.8L262.2 84.2c-.8-.1-1.6-.1-2.4-.1h-6.6c-.8 0-1.6 0-2.4.1L104.3 94.8c-17.6 1.3-31.3 16-31.3 33.7v210.6c0 64 129.8 154.5 164.8 177.9 5.5 3.7 12 5.6 18.7 5.6 6.6 0 13.1-1.9 18.6-5.6C310.2 493.9 440 403.8 440 339.1V128.5c0-17.7-13.7-32.4-31.3-33.7zm-27.6 180.4c0 11.2-9.1 20.3-20.3 20.3h-72.4v72.4c0 11.2-9.1 20.3-20.3 20.3h-23.3c-11.2 0-20.3-9.1-20.3-20.3v-72.4h-72.4c-11.2 0-20.3-9.1-20.3-20.3v-23.3c0-11.2 9.1-20.3 20.3-20.3h72.4v-72.4c0-11.2 9.1-20.3 20.3-20.3h23.3c11.2 0 20.3 9.1 20.3 20.3v72.4h72.4c11.2 0 20.3 9.1 20.3 20.3v23.3z" fill="#7aaca0" />
      </svg>
    `;
  }

  if (type === 'facebook') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="250" cy="299" r="244" fill="#b2d8ce" />
        <path d="M223.8 543.6V288.7h-51.7v-89.5h51.7c0-5-.1-9 0-13 .7-24.1-.6-48.4 2.5-72.2C233 63.3 266 33.7 317 31.6c30.7-1.3 61.5-.2 93.1-.2V120c-13.5 0-26.9-.2-40.3.1-6.9.1-13.8.5-20.5 1.8-9.8 1.9-16.4 8.2-17.2 18.2-1.5 19.1-2 38.3-2.9 58.6h83.2c-3.3 30.1-6.4 59.1-9.7 89.2h-72.1v255.8c-35.9-.1-70.6-.1-106.8-.1z" fill="#7aaca0" />
      </svg>
    `
  }

  if (type === 'pin') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="250" cy="299" r="244" fill="#b2d8ce" />
        <path d="M280.5 433.8l104.3-180.7c34.7-60.1 25.3-135.9-23.1-185.6-60.8-62.7-161.3-62.7-222.2-.2l-.1.2c-48.5 49.7-58 125.6-23.3 185.8l104.2 180.5c13.4 23.1 46.8 23.1 60.2 0zm-30.1-333.7c37.6 0 68 30.4 68 68s-30.4 68-68 68-68-30.4-68-68 30.4-68 68-68z" fill="#7aaca0" />
      </svg>
    `
  }

  if (type === 'rocket') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
        <circle cx="250" cy="299" r="244" fill="#b2d8ce" />
        <path fill="#7aaca0" d="M121.1 339.6c-10.4-9.7-37.7-24.8-55.9-34.4-7.5-3.9-5.3-17.8 3.8-24 34.5-23.5 101.2-66.8 129.3-69.5-35 50.4-61.9 97.1-73.7 118.4-1.8 3.2-2.9 6.4-3.5 9.5zM327.3 469c-14.9-10.8-37-26.2-51-32.9 2.7-1.9 5.3-4.5 7.5-7.7 13.5-20.1 42.4-64.7 71.2-118.1 17.2 31.2-1.7 101-7.8 144.7-1.6 10.9-13 19-19.9 14zM419.4 35.1c-.5-1.4-1.4-2.5-2.5-3.2s-2.5-1-4-.9c-69.8 6.9-148 97.2-205.1 179.1-35.8 51.3-63.4 99.2-75.6 121.1-2.1 3.8-3 7.8-2.7 11 .2 2.7 1.3 4.8 3.2 6l130.8 81.1c.9.5 1.8.8 2.9.9h.4c3.9 0 8.8-3.1 12.2-8.3 13.9-20.7 43.5-66.3 72.5-120.7 47.1-88.4 93-200.1 67.9-266.1zm-39.3 123c-9.8 15.7-30.4 20.6-46.2 10.8-15.7-9.8-20.6-30.4-10.8-46.2 9.8-15.7 30.4-20.6 46.2-10.8 15.7 9.8 20.6 30.4 10.8 46.2zM229 419.8l-72.9-45.2c-4.2-2.6-9.8-.5-11.2 4.3l-44 152.2c-2.1 7.3 6.7 12.7 12.3 7.6l116.9-107c3.7-3.3 3.2-9.3-1.1-11.9zm-26.6.5l-34.7 31.8c-5.6 5.1-14.4-.3-12.3-7.6l13.1-45.3c1.4-4.8 7-6.9 11.2-4.3l21.7 13.4c4.1 2.7 4.7 8.6 1 12z" />
      </svg>
    `
  }

  if (type === 'info') {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="54" viewBox="0 0 500 550">
      <circle cx="250" cy="299" r="244" fill="#b2d8ce" />
      <path d="M146 507v-41l46.9-5.2c10.9-1.3 12.5-3.2 12.5-13V238.5c0-7.2-2.3-11.7-10.2-13.7l-43-12.4 7.8-41.6h135.3v276.9c0 10.4.8 11.7 12.5 13l46.1 4.6V507H146zm94.6-399.8c-37.5 0-58.6-17.6-58.6-48.8 0-30.6 21.1-47.5 58.6-47.5 36.7 0 58.6 16.9 58.6 47.5 0 31.3-21.8 48.8-58.6 48.8z" fill="#7aaca0" />
      </svg>
    `
  }
}

const PagePreview = createClass({
  render() {
    const { entry, widgetsFor } = this.props;

    return (
      html`
        <div class="Layout">
          <main class="layout__content">
            <div class="title">
              <div class="title__icon"><${Icon} type=${entry.getIn(['data', 'icon'])} /></div>
              <h1 class="title__wrapper">
                <span class="title__text">${entry.getIn(['data', 'title'])}</span>
              </h1>
            </div>

            <div
              class="page__body"
              dangerouslySetInnerHTML=${{
                __html: markdownit().render(entry.getIn(['data', 'body']))
              }}
            />

            ${widgetsFor('expanding').map((item) => html`
              <details class="page__expanding-section">
                <summary class="page__expanding-preview">
                  <h3 class="page__expanding-title">${item.getIn(['data', 'title'])}</h3>
                </summary>

                <div
                  class="page__body" 
                  dangerouslySetInnerHTML=${{
                    __html: markdownit().render(item.getIn(['data', 'content']))
                  }}
                />
              </details>
              `)}
          </main>
        </div>
      `
    );
  }
});

CMS.registerPreviewTemplate("pages", PagePreview);


