// Importa React per creare il contesto e usare hook
import React from "react";

// Definisce il tipo del contesto Tabs con due proprietà:
// - activeTab: stringa che indica il tab attivo
// - setActiveTab: funzione per aggiornare il tab attivo
interface TabsContextType {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

// Crea il contesto React per Tabs, inizializzato a undefined
// Serve per condividere stato e funzione tra componenti Tabs
export const TabsContext = React.createContext<TabsContextType | undefined>(
    undefined,
);

// Hook custom per usare il contesto Tabs in modo semplice e sicuro
export const useTabsContext = () => {
    // Recupera il contesto usando useContext
    const context = React.useContext(TabsContext);

    // Se il contesto non è definito, significa che il componente
    // non è usato all’interno di un provider Tabs, quindi lanciamo errore
    if (context === undefined) {
        throw new Error("useTabsContext must be used within a Tabs component");
    }

    // Restituisce il contesto correttamente valorizzato
    return context;
};
