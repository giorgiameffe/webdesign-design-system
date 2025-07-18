import type { Preview } from '@storybook/react-vite'
// Importazione foglio di stile reset
import "../src/styles/reset.css";
// Importazione spacing
import "../src/styles/variables.css";
// Importazione typography
import "../src/styles/typography.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;