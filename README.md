# 🎨 UI Design System – Componenti, Stories e Test

**Sistema di Design per Interfacce Utente**  
Questo progetto contiene un sistema di design creato per standardizzare e accelerare lo sviluppo di interfacce utente. Utilizza **Storybook** per documentare e testare i componenti in modo isolato.

---

## 📂 Struttura del Progetto

Il progetto è organizzato in modo modulare per facilitare la gestione e la riusabilità dei componenti.

- **components/**  
  Contiene tutti i componenti riutilizzabili dell'interfaccia utente (UI). Attualmente include:
  - `Badge`
  - `Tabs`
  - `Input`

- **Tabs/**  
  Esempio di componente complesso, con file dedicati per le diverse parti:  
  `Tabs.tsx`, `TabsButton.tsx`, ecc.

- **stories/**  
  Directory dedicata alla documentazione dei componenti con Storybook.  
  Ogni componente ha il suo file `.stories.tsx` che mostra i vari stati e varianti.  

  Alcune stories non rappresentano componenti ma servono a mostrare linee guida di design:  
  - `Color.stories.tsx` → mostra la palette colori del progetto  
  - `Typography.stories.tsx` → mostra gli stili tipografici  
  - `Spacing.stories.tsx` → mostra le spaziature standard  

  Componenti con le loro stories:  
  - `Badges.stories.tsx`  
  - `Tabs.stories.tsx`  
  - `Input.stories.tsx`

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
git clone https://github.com/giorgiameffe/webdesign-design-system
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

- Il sistema di design è pensato per **componenti riutilizzabili**, con attenzione alla **modularità** e alla **documentazione**.
- Alcune stories (**Color**, **Typography**, **Spacing**) non rappresentano componenti ma mostrano le **linee guida visive** del progetto.
- I componenti effettivi del progetto sono **Badge**, **Tabs** e **Input**.
- Gli stili sono gestiti tramite **file CSS separati** per garantire chiarezza e manutenzione semplice.
- I test sono generati con **Playwright**, per verificare i componenti in scenari realistici.