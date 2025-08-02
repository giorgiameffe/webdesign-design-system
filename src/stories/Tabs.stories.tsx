// Tipi utili per tipizzare il componente e le storie in Storybook
import type { Meta, StoryObj } from "@storybook/react";

// Importazione del componente Tabs da testare e documentare
import { Tabs } from "../components/Tabs/Tabs";

// Per incapsulare stili usando Shadow DOM (utile in ambienti isolati)
import root from "react-shadow";

import { Badge } from "../components/Badge/Badge";

// Definizione dei metadati per Storybook: titolo, componente, e tag
const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",    // Nome e sezione visibile nella UI di Storybook
    component: Tabs,             // Componente associato a questa storia
    tags: ['autodocs']           // Abilita la generazione automatica dei docs
};

// Esporta il meta come default per Storybook (richiesto)
export default meta;

// Alias per tipizzare la storia in base al componente Tabs
type Story = StoryObj<typeof Tabs>;

// Componente placeholder che simula contenuto nei pannelli delle tab
const Skeleton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        // Shadow DOM per isolare lo stile dal resto della pagina
        <root.div>
            {/* Stile inline iniettato per il contenitore scheletro */}
            <style>{`
				div {
					text-align: center;
					background-color: light-dark(var(--color-gray-1), var(--color-gray-15));
					border-radius: var(--border-radius-md, 0.5rem);
					width: 30rem;
					max-width: 100%;
					min-height: 4rem;
					margin-bottom: 1rem;
					align-content: center;
				}
			`}</style>
            <div>{children}</div> {/* Mostra il contenuto testuale/JSX passato */}
            <div /> {/* Placeholder vuoti per completare l’aspetto del contenuto */}
            <div />
            <div />
        </root.div>
    );
};

export const Default: Story = {
    render: () => (
        <Tabs> {/* Contenitore principale delle tab */}

            {/* Prima tab con etichetta semplice */}
            <Tabs.Item label="Label 1">
                <Skeleton>Tab content 1</Skeleton> {/* Contenuto del pannello 1 */}
            </Tabs.Item>

            {/* Seconda tab con etichetta semplice */}
            <Tabs.Item label="Label 2">
                <Skeleton>Tab content 2</Skeleton> {/* Contenuto del pannello 2 */}
            </Tabs.Item>

            {/* Terza tab con etichetta semplice */}
            <Tabs.Item label="Label 3">
                <Skeleton>Tab content 3</Skeleton> {/* Contenuto del pannello 3 */}
            </Tabs.Item>

            {/* Tab con etichetta customizzata: testo + badge "New" */}
            <Tabs.Item
                label={
                    <span>
                        Label 3 <Badge>New</Badge> {/* Badge evidenzia che è una novità */}
                    </span>
                }
            >
                <Skeleton>Tab content 3</Skeleton> {/* Contenuto ripetuto per esempio */}
            </Tabs.Item>

            {/* Tab con badge "Positive" e variante visiva positiva */}
            <Tabs.Item
                label={
                    <span>
                        Label 4 <Badge variant="positive">Positive</Badge>
                    </span>
                }
            >
                <Skeleton>Tab content 4</Skeleton>
            </Tabs.Item>

            {/* Tab con badge "Negative" e variante visiva negativa */}
            <Tabs.Item
                label={
                    <span>
                        Label 5 <Badge variant="negative">Negative</Badge>
                    </span>
                }
            >
                <Skeleton>Tab content 5</Skeleton>
            </Tabs.Item>

        </Tabs>
    ),
};

