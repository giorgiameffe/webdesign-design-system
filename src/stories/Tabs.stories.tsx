// Importa i tipi da Storybook per tipizzare la storia (Meta, StoryObj)
import type { Meta, StoryObj } from "@storybook/react";

// Importa il componente Tabs da testare
import { Tabs } from "../components/Tabs/Tabs";

// Importa react-shadow per usare Shadow DOM nel componente di esempio
import root from "react-shadow";

// Importa il componente Badge, usato nelle label dei tab
import { Badge } from "../components/Badge/Badge";

// Definisce i metadati della storia per Storybook
const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",    // Percorso nella sidebar di Storybook
    component: Tabs,             // Componente da documentare
    tags: ['autodocs']           // Tag usato da Storybook per generare automaticamente i docs
};

// Esporta il meta come default (obbligatorio per ogni file .stories.tsx)
export default meta;

// Definisce il tipo base della storia
type Story = StoryObj<typeof Tabs>;

// Componente Skeleton per mostrare un contenuto placeholder in ogni tab
const Skeleton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <root.div> {/* Usa Shadow DOM per incapsulare gli stili del blocco */}
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
            <div>{children}</div> {/* Contenuto passato come children */}
            <div /> {/* Altri div vuoti per simulare blocchi o righe scheletro */}
            <div />
            <div />
        </root.div>
    );
};

// Definisce la storia "Default" che mostra Tabs con vari <Tabs.Item />
export const Default: Story = {
    render: () => (
        <Tabs>
            {/* Tab semplice con testo */}
            <Tabs.Item label="Label 1">
                <Skeleton>Tab content 1</Skeleton>
            </Tabs.Item>

            <Tabs.Item label="Label 2">
                <Skeleton>Tab content 2</Skeleton>
            </Tabs.Item>

            <Tabs.Item label="Label 3">
                <Skeleton>Tab content 3</Skeleton>
            </Tabs.Item>

            {/* Tab con Badge "New" accanto all'etichetta */}
            <Tabs.Item
                label={
                    <span>
                        Label 3 <Badge>New</Badge>
                    </span>
                }
            >
                <Skeleton>Tab content 3</Skeleton>
            </Tabs.Item>

            {/* Tab con Badge "Positive" (verde, ad esempio) */}
            <Tabs.Item
                label={
                    <span>
                        Label 4 <Badge variant="positive">Positive</Badge>
                    </span>
                }
            >
                <Skeleton>Tab content 4</Skeleton>
            </Tabs.Item>

            {/* Tab con Badge "Negative" (rosso, ad esempio) */}
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