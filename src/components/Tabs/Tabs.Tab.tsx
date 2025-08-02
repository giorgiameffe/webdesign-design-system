// Importa il custom hook per accedere al contesto Tabs
import { useTabsContext } from "./Tabs.Context";

// Definisce le props accettate dal componente Tab
// - id: identificatore univoco del pannello/tab
// - children: contenuto del pannello (qualsiasi ReactNode)
interface TabProps {
    id: string;
    children: React.ReactNode;
}

// Componente che rappresenta il pannello di un tab
export const Tab: React.FC<TabProps> = ({ id, children }) => {
    // Estrae dal contesto quale tab è attivo
    const { activeTab } = useTabsContext();

    return (
        <div
            aria-labelledby={`button-${id}`} // collega il pannello al tab button tramite aria-labelledby
            role="tabpanel"                 // ruolo ARIA per indicare che è un pannello di tab
            key={id}                       // key React, aiuta il rendering efficiente
            id={id}                        // id univoco del pannello, usato da aria-controls
            hidden={activeTab !== id}      // nasconde il pannello se non è quello attivo
        >
            {children}                    {/* Contenuto del pannello */}
        </div>
    );
};
