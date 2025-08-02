// Importa il tipo ReactElement per la type guard
import type { ReactElement } from "react";

// Importa React e i suoi hook
import React from "react";

// Importa il componente <Item> e le sue props
import { Item, type ItemProps } from "./Tabs.Item";

// Importa il componente della lista di tab (header con i bottoni)
import { List } from "./Tabs.List";

// Importa il contesto per la gestione dello stato attivo
import { TabsContext } from "./Tabs.Context";

// Importa il componente per i pannelli dei tab
import { Tab } from "./Tabs.tab";

// Importa react-shadow per creare un Shadow DOM
import root from "react-shadow";

// Importa il CSS raw come stringa per iniettarlo dinamicamente
import css from "./Tabs.css?raw";

// Importa il componente che inietta gli stili globali (reset + tipografia)
// all'interno del DOM o dello Shadow DOM tramite un tag <style>
import { GlobalStyles } from "../GlobalStyles";

// Type guard: verifica se un child è un <Item />
const isTabValidChildren = (
    child: React.ReactNode,
): child is ReactElement<typeof Item> => {
    return React.isValidElement(child) && child.type === Item;
};

// Props accettate dal componente Tabs: figli React e altre HTML props
type TabsProps = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

// Componente principale Tabs
export const Tabs: React.FC<TabsProps> & { Item: typeof Item } = ({
    children,
}) => {
    // Crea un ID base unico per i tab
    const id = React.useId();

    // Stato per tracciare quale tab è attivo, parte dal primo
    const [activeTab, setActiveTab] = React.useState(id + 0);

    // Estrae solo i figli validi (<Tabs.Item>) e assegna loro un ID unico
    const validChildren = React.Children.toArray(children)
        .filter(isTabValidChildren)
        .map((child, i) => ({ ...child, id: id + i }));

    // Prepara un array con le etichette e gli ID dei tab per il rendering della lista
    const tabsLabels = validChildren.map((child) => ({
        label: (child.props as unknown as ItemProps).label,
        tabId: child.id,
    }));

    // Se ci sono figli non validi, mostra un warning in console
    if (validChildren.length !== React.Children.count(children)) {
        console.warn("Invalid children for Tabs");
    }

    return (
        // Usa Shadow DOM per isolare markup e stili
        <root.div role="tablist">
            <GlobalStyles />    {/* Inietta gli stili globali */}
            <style>{css}</style>       {/* Inietta dinamicamente lo stile CSS del componente */}
            <TabsContext.Provider value={{ activeTab, setActiveTab }}>
                {/* Renderizza la lista di tab (bottoni) */}
                <List tabsLabels={tabsLabels} />

                {/* Renderizza il contenuto dei tab (pannelli) */}
                {validChildren.map(({ id, ...child }) => {
                    return (
                        <Tab id={id} key={id}>
                            {child}
                        </Tab>
                    );
                })}

                {/* Renderizza i figli non validi (cioè non <Tabs.Item>) senza modificarli */}
                {React.Children.map(children, (child) => {
                    if (!isTabValidChildren(child)) {
                        return child;
                    }
                    return null;
                })}
            </TabsContext.Provider>
        </root.div>
    );
};

// Aggiunge la proprietà statica Tabs.Item per usare <Tabs.Item> nei consumer
Tabs.Item = Item;
