// Importa solo il tipo ReactElement per tipizzare i children
import type { ReactElement } from "react";

// Importa React per poter usare JSX, hook e altre funzioni
import React from "react";

// Importa il componente <Tabs.Item> e il tipo dei suoi props
import { Item, type ItemProps } from "./Tabs.Item";

// Importa il componente che renderizza le etichette dei tab, rinominato per chiarezza
import { List as TabsHeader } from "./Tabs.List";

// Importa il contesto React per condividere lo stato del tab attivo
import { TabsContext } from "./Tabs.Context";

// Importa il componente che visualizza il contenuto del tab attivo, rinominato per chiarezza
import { Tab as TabsPanel } from "./Tabs.tab";

/*
 Verifica che un nodo React sia un elemento valido di tipo <Tabs.Item>.
 Questo serve per filtrare solo i figli rilevanti all’interno del componente Tabs.
*/

const isValidTabsItem = (
    child: React.ReactNode,
): child is ReactElement<typeof Item> => {
    return React.isValidElement(child) && child.type === Item;
};

type TabsProps = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/*
 Componente Tabs – gestisce un'interfaccia a tab con intestazioni cliccabili e pannelli di contenuto associati.
 Usa il context interno per tracciare quale tab è attivo e isola gli stili tramite Shadow DOM.
*/

export const Tabs: React.FC<TabsProps> & { Item: typeof Item } = ({
    children,
    ...props
}) => {
    const baseId = React.useId(); // Base per generare ID univoci per ogni tab
    const [activeTabId, setActiveTabId] = React.useState(`${baseId}-0`);

    // Estrae tutti i figli validi di tipo <Tabs.Item>, associando a ciascuno un ID univoco e la sua etichetta.

    const tabItems = React.Children.toArray(children)
        .filter(isValidTabsItem)
        .map((element, index) => ({
            element, // Il nodo React originale (<Tabs.Item />)
            id: `${baseId}-${index}`, // ID univoco per gestire attivazione
            label: (element.props as ItemProps).label, // Etichetta da mostrare nel tab header
        }));

    // Se ci sono figli non validi, avvisa nello sviluppo.

    if (tabItems.length !== React.Children.count(children)) {
        console.warn(
            "[Tabs] Alcuni figli passati al componente non sono <Tabs.Item> e verranno ignorati nella navigazione."
        );
    }

    return (
        <root.div role="tablist" {...props}>
            {/* Stili globali e specifici dei Tabs (iniettati nel Shadow DOM) */}
            <GlobalStyles />
            <style>{css}</style>

            {/* Fornisce il contesto a <Tabs.List> e <Tabs.Tab> */}
            <TabsContext.Provider value={{ activeTab: activeTabId, setActiveTab: setActiveTabId }}>
                {/* Renderizza l'intestazione dei tab (le etichette cliccabili) */}
                <TabsHeader
                    tabsLabels={tabItems.map(({ label, id }) => ({
                        label,
                        tabId: id,
                    }))}
                />

                {/* Renderizza ciascun contenuto tab associato a un'etichetta */}
                {tabItems.map(({ id, element }) => (
                    <TabsPanel id={id} key={id}>
                        {element}
                    </TabsPanel>
                ))}

                {/* Renderizza eventuali figli non validi, ad esempio testo o altri elementi */}
                {React.Children.map(children, (child) =>
                    !isValidTabsItem(child) ? child : null
                )}
            </TabsContext.Provider>
        </root.div>
    );
};

// Associa Tabs.Item al componente <Item /> per l'uso come <Tabs.Item>
Tabs.Item = Item;
