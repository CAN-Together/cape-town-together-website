export default { title: 'button' };

export const Default = () => `
    <a 
        class="button button_default"
        href="#"
        target="_self>"
    >
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>

        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </a>
`;

export const SemanticButton = () => `
    <button
        class="button button_default"
        type="submit"
        target="_self>"
    >
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>

        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </button>
`;

export const Barebones = () => `
    <a 
        class="button"
        href="#"
        target="_self>"
    >
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>

        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </a>
`;

export const Disabled = () => `
    <a 
        class="button button_default button_disabled"
        target="_self>"
    >
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>

        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </a>
`;