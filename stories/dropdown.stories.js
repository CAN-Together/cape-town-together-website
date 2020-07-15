export default { title: 'dropdown' };

export const Default = () => `
    <div style="padding: 2rem">
        <label class="dropdown">
            <span class="dropdown__label">Hello World!</span>

            <select class="dropdown__select">
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
            </select>
        </label>
    </div>
`;

export const Loading = () => `
    <div style="padding: 2rem">
        <label class="dropdown">
            <span class="dropdown__label">Hello World!</span>

            <select class="dropdown__select dropdown__select_loading" disabled>
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
            </select>
        </label>
    </div>
`;
