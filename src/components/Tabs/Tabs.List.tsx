// Importa il componente Button usato per ogni singolo tab
import { Button } from "./Tabs.Button";

// Definisce il tipo delle props accettate dal componente List (header dei tab)
// tabsLabels è un array di oggetti con label e tabId per ogni tab
type TablistProp = {
    tabsLabels: {
        label: React.ReactNode; // etichetta del tab, testo o JSX
        tabId: string;          // identificatore unico del tab
    }[];
};

// Componente funzionale che renderizza la lista delle etichette (tab buttons)
export const List: React.FC<TablistProp> = ({ tabsLabels }) => {
    // Gestore degli eventi da tastiera per la navigazione tra i tab (accessibilità)
    const handleKeyDown = (event: React.KeyboardEvent) => {
        // Prende tutti i bottoni con ruolo 'tab' presenti nel contenitore attuale
        const buttons = Array.from(
            event.currentTarget.querySelectorAll("button[role='tab']"),
        );
        // Trova l'indice del bottone che ha ricevuto l'evento (quello attualmente focalizzato)
        const currentIndex = buttons.findIndex((button) => button === event.target);
        let newIndex = currentIndex;

        // Gestione delle frecce e tasti speciali per spostare il focus
        switch (event.key) {
            case "Home":       // Home porta al primo tab
                newIndex = 0;
                break;
            case "ArrowRight": // Freccia destra o freccia su spostano avanti il focus
            case "ArrowUp":
                newIndex = (currentIndex + 1) % buttons.length; // ciclico
                break;
            case "ArrowLeft":  // Freccia sinistra o giù spostano indietro il focus
            case "ArrowDown":
                newIndex = (currentIndex - 1 + buttons.length) % buttons.length; // ciclico
                break;
            case "End":        // End porta all'ultimo tab
                newIndex = buttons.length - 1;
                break;
            default:           // Altri tasti non fanno nulla
                return;
        }

        // Mette il focus sul nuovo bottone calcolato
        const next = buttons[newIndex] as HTMLButtonElement;
        next?.focus();

        // Previene il comportamento di default della tastiera
        event.preventDefault();
    };

    // Renderizza il contenitore della lista con il gestore di tastiera
    return (
        <div className="tablist" onKeyDownCapture={handleKeyDown}>
            {/* Mappa tutti i tabsLabels creando un Button per ognuno */}
            {tabsLabels.map(({ label, tabId }) => (
                <Button key={tabId} tabId={tabId}>
                    {label} {/* etichetta visibile */}
                </Button>
            ))}
        </div>
    );
};