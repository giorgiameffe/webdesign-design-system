// Tipi utili per tipizzare il componente e le storie in Storybook
import type { Meta, StoryObj } from "@storybook/react";

// Importazione del componente Tabs da testare e documentare
import { Tabs } from "../components/Tabs/Tabs";

// Per incapsulare stili usando Shadow DOM (utile in ambienti isolati)
import root from "react-shadow";

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

// Storia di esempio che mostra Tabs con varie etichette e contenuti
export const Default: Story = {
    render: () => (
        <Tabs>
            {/* Ogni <Tabs.Item> rappresenta un tab cliccabile con contenuto associato */}
            <Tabs.Item label="Label 1">
                <Skeleton>Tab content 1</Skeleton>
            </Tabs.Item>
            <Tabs.Item label="Label 2">
                <Skeleton>Tab content 2</Skeleton>
            </Tabs.Item>
            <Tabs.Item label="Label 3">
                <Skeleton>Tab content 3</Skeleton>
            </Tabs.Item>
        </Tabs>
    ),
};
