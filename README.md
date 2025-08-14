# 🎨 Design System

**Sistema di Design per Interfacce Utente**  
Questo progetto contiene un sistema di design creato per standardizzare e accelerare lo sviluppo di interfacce utente. Utilizza **Storybook** per documentare e testare i componenti in modo isolato.

---

## 📂 Struttura del Progetto

Il progetto è organizzato in modo modulare per facilitare la gestione e la riusabilità dei componenti.

- **components/**  
  Contiene tutti i componenti riutilizzabili dell'interfaccia utente (UI).

- **Tabs/**  
  Esempio di componente complesso, con file dedicati per le diverse parti:  
  `Tabs.tsx`, `TabsButton.tsx`, ecc.

- **stories/**  
  Directory dedicata alla documentazione dei componenti con Storybook.  
  Ogni componente ha il suo file `.stories.tsx` che mostra i vari stati e varianti.

  Esempi:
  - `Badges.stories.tsx`
  - `Color.stories.tsx`
  - `Typography.stories.tsx`
  - ...e così via per tutti i componenti.

- **styles/**  
  Contiene i fogli di stile globali e le variabili CSS.

  - `reset.css`: Resetta le impostazioni predefinite dei browser  
  - `typography.css`: Stili per la tipografia  
  - `variables.css`: Definizioni di variabili CSS (colori, spaziature, ecc.)

- **test-results/**  
  Output dei test end-to-end generati con **Playwright**.

---

## ⚙️ Tecnologie Principali

- **Framework/Libreria**: React (TSX)  
- **Bundler/Dev Server**: Vite  
- **Documentazione/UI Dev Tool**: Storybook  
- **Testing End-to-End**: Playwright  
- **Linter**: ESLint  
- **Stili**: CSS separati e modulati  

---

## 🚀 Come Iniziare

### ⚙️ Prerequisiti
Assicurati di avere installato sul sistema:
- Node.js  
- npm  

### 📥 Installazione
Clona il repository e installa le dipendenze:

```bash
git clone https://tuo-repository-url.git
cd webdesign-design-system
npm install
```

### 💻 Avviare il Server di Sviluppo

Se disponibile un ambiente di sviluppo locale:
```
npm run dev
```

### 🧪 Eseguire i Test

Per eseguire i test end-to-end con Playwright:
```
npm run test
```

### 📚 Note

- Il sistema di design è pensato per componenti riutilizzabili, con attenzione alla modularità e alla documentazione.
- Gli stili sono gestiti tramite file CSS separati per garantire chiarezza e manutenzione semplice.
- I test sono generati con Playwright, per verificare i componenti in scenari realistici.