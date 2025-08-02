// Tipizzazione per il file di preview Storybook
import type { Preview } from '@storybook/react-vite'

// Importa il file di reset CSS per azzerare gli stili di default del browser
import "../src/styles/reset.css";

// Importa le variabili CSS (es. spacing, colori, ecc.)
import "../src/styles/variables.css";

// Importa il file di tipografia (font, pesi, dimensioni testo, ecc.)
import "../src/styles/typography.css";

// Importa il decoratore per supportare il cambio tema (light/dark)
import { withThemeByClassName } from "@storybook/addon-themes";

// Oggetto di configurazione globale di Storybook
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        // Permette a Storybook di associare automaticamente i controlli
        // a proprietà che contengono "background" o "color"
        color: /(background|color)$/i,
        // Associa automaticamente i controlli a tutte le proprietà che terminano con "Date"
        date: /Date$/i,
      },
    },

    a11y: {
      // Configurazione accessibilità: 'todo' mostra solo i problemi in UI,
      // ma non blocca i test o la CI (utile in sviluppo)
      test: 'todo'
    },
  },

  decorators: [
    // Applica i temi "light" e "dark" aggiungendo una classe al <body>
    withThemeByClassName({
      themes: {
        light: "light-theme", // classe CSS per il tema chiaro
        dark: "dark-theme",   // classe CSS per il tema scuro
      },
      defaultTheme: "light",     // tema predefinito
      parentSelector: "body",    // il selettore su cui viene applicata la classe del tema
    }),
  ],
};

// Esporta la configurazione per l'anteprima
export default preview;