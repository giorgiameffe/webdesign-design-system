// Importa React per usare JSX, hook e stato
import React from "react";

// Importa il custom hook per accedere al contesto Tabs
import { useTabsContext } from "./Tabs.Context";

// Definisce il tipo delle props per il componente Button:
// - children: contenuto interno del bottone (etichetta, JSX, ecc.)
// - tabId: stringa unica per identificare il tab
type ButtonProps = {
    children: React.ReactNode;
    tabId: string;
};

// Componente Button che rappresenta un singolo tab cliccabile
export const Button: React.FC<ButtonProps> = ({ children, tabId }) => {
    // Estrae dal contesto il tab attivo e la funzione per cambiarlo
    const { activeTab, setActiveTab } = useTabsContext();

    // Stato locale per gestire se il bottone è focusable (tabIndex 0 o -1)
    // Inizializzato true solo se questo tab è quello attivo
    const [focusable, setFocusable] = React.useState(activeTab === tabId);

    return (
        <button
            role="tab"              // Attributo ARIA per indicare che è un tab
            type="button"           // Tipo bottone normale (non submit)
            key={tabId}             // Key per React (non sempre necessaria qui)
            onClick={() => setActiveTab(tabId)}  // Cambia tab attivo al click
            aria-controls={tabId}   // ID del pannello associato (per accessibilità)
            aria-selected={activeTab === tabId}  // Indica se è selezionato
            id={`button-${tabId}`}  // ID univoco del bottone
            tabIndex={focusable ? 0 : -1}  // Solo il tab attivo è tab-navigabile
            onFocus={() => setFocusable(true)}  // Quando focusato diventa navigabile
            onBlur={() => setFocusable(activeTab === tabId)}  // Ripristina stato al blur
        >
            {children}  {/* Etichetta o contenuto interno del bottone */}
        </button>
    );
};
