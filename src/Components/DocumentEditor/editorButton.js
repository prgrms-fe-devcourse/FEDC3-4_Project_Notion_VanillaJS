export const editorButton = ({ color = 'gray', text = 'none', event = '' }) => {
  return `
    <button
    class="rounded-lg bg-${color}-700 px-5 py-1 text-lg font-medium text-white hover:bg-${color}-800 focus:outline-none focus:ring-4 focus:ring-${color}-300"
    data-event=${event}>
        ${text}
    </button>
  `;
};
