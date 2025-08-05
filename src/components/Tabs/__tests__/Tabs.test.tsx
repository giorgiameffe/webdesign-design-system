// Importa le utility principali per il testing del DOM con React
import { render, within, fireEvent } from "@testing-library/react";
// Importa i matchers personalizzati di Jest per facilitare le asserzioni sul DOM (es: toBeInTheDocument, toBeVisible)
import "@testing-library/jest-dom";
// Importa il componente Tabs da testare
import { Tabs } from "../Tabs";

// Funzione di utilità per accedere allo Shadow DOM del componente Tabs
const getShadowRoot = (): HTMLElement | null => {
    // Cerca il contenitore del componente Tabs nel DOM usando un data-testid
    const shadowHost = document.querySelector('div[data-testid="tabs-root"]');
    // Se lo trova, restituisce il suo shadowRoot convertito a HTMLElement, altrimenti null
    return shadowHost ? (shadowHost.shadowRoot as unknown as HTMLElement) : null;
};

// Definisce il blocco di test per il componente Tabs
describe('Tabs Component', () => {

    // Funzione helper che renderizza il componente Tabs con 3 tab (ciascuna con un'etichetta e un contenuto)
    const renderTabs = () => (
        <Tabs>
            <Tabs.Item label="Tab 1">Content 1</Tabs.Item>
            <Tabs.Item label="Tab 2">Content 2</Tabs.Item>
            <Tabs.Item label="Tab 3">Content 3</Tabs.Item>
        </Tabs>
    );

    // Variabile che conterrà il riferimento allo Shadow DOM del componente Tabs
    // Viene inizializzata a null e popolata prima di ogni test
    let shadowRoot: HTMLElement | null = null;

    // Hook eseguito prima di ogni test
    beforeEach(() => {
        render(renderTabs()); // Renderizza il componente Tabs nel DOM virtuale
        shadowRoot = getShadowRoot(); // Recupera il riferimento allo Shadow DOM del componente
        expect(shadowRoot).not.toBeNull(); // Verifica che lo Shadow DOM sia stato trovato correttamente
    });

    // Hook eseguito dopo ogni test per pulire la variabile
    afterEach(() => {
        shadowRoot = null; // Azzera il riferimento allo Shadow DOM
    });

    // Test: Verifica che le etichette delle tab siano presenti nel DOM
    it("renders all tab labels", () => {
        if (!shadowRoot) return; // Se lo Shadow DOM non è disponibile, esce dal test
        const { getByText } = within(shadowRoot); // Usa 'within' per effettuare query all’interno dello Shadow DOM

        // Verifica che ogni etichetta sia renderizzata correttamente
        expect(getByText("Tab 1")).toBeInTheDocument();
        expect(getByText("Tab 2")).toBeInTheDocument();
        expect(getByText("Tab 3")).toBeInTheDocument();
    });

    // Test: Verifica che il contenuto della prima tab sia visibile e gli altri no al primo render
    it("displays the first tab content by default and hides the others", () => {
        if (!shadowRoot) return;
        const { getByText } = within(shadowRoot);

        // Recupera gli elementi di contenuto per ciascuna tab
        const content1 = getByText("Content 1");
        const content2 = getByText("Content 2");
        const content3 = getByText("Content 3");

        // Verifica che il contenuto della prima tab sia visibile, gli altri nascosti
        expect(content1).toBeInTheDocument();
        expect(content1).toBeVisible(); // Deve essere visibile

        expect(content2).toBeInTheDocument();
        expect(content2).not.toBeVisible(); // Deve essere nascosto

        expect(content3).toBeInTheDocument();
        expect(content3).not.toBeVisible(); // Deve essere nascosto
    });

    // Test: Verifica il comportamento del cambio di tab tramite click
    it("switches content when clicking on a different tab", async () => {
        if (!shadowRoot) return;
        const { getByText } = within(shadowRoot);

        // Recupera i contenuti delle tab, selezionando il loro elemento genitore per verificarne la visibilità
        const content1 = getByText("Content 1").parentElement;
        const content2 = getByText("Content 2").parentElement;
        const content3 = getByText("Content 3").parentElement;

        // Simula il click sulla seconda tab
        const tab2 = getByText("Tab 2");
        fireEvent.click(tab2);

        // Dopo il click, solo il contenuto 2 dovrebbe essere visibile
        expect(content1).toHaveAttribute("hidden");
        expect(content2).not.toHaveAttribute("hidden");
        expect(content3).toHaveAttribute("hidden");

        // Simula il click sulla terza tab
        const tab3 = getByText("Tab 3");
        fireEvent.click(tab3);

        // Ora solo il contenuto 3 dovrebbe essere visibile
        expect(content1).toHaveAttribute("hidden");
        expect(content2).toHaveAttribute("hidden");
        expect(content3).not.toHaveAttribute("hidden");
    });

    // Test: Verifica che venga gestito correttamente l’attributo aria-selected per l’accessibilità
    it("applies aria-selected attribute to the selected tab", () => {
        if (!shadowRoot) return;
        const { getAllByRole } = within(shadowRoot);

        // Recupera tutti gli elementi con ruolo ARIA "tab"
        const tabs = getAllByRole("tab");

        // Verifica che inizialmente solo la prima tab sia selezionata
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
        expect(tabs[1]).toHaveAttribute("aria-selected", "false");
        expect(tabs[2]).toHaveAttribute("aria-selected", "false");

        // Simula il click sulla seconda tab
        fireEvent.click(tabs[1]);

        // Verifica che ora la seconda tab sia selezionata e le altre no
        expect(tabs[0]).toHaveAttribute("aria-selected", "false");
        expect(tabs[1]).toHaveAttribute("aria-selected", "true");
        expect(tabs[2]).toHaveAttribute("aria-selected", "false");
    });

});
