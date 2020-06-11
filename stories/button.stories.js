export default { title: 'button' };

export const Default = () => `
    <button class="button button_default">
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>
        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </button>
`

export const Flat = () => `
    <button class="button">
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>
        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </button>
`

export const Disabled = () => `
    <button class="button button_default button_disabled">
        <span class="button__text">Hello World!</span>
        <span class="button__arrow"></span>
        <span class="button__ripple">
            <span class="button__circle"></span>
        </span>
    </button>
`