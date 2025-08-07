// Importa i tipi Meta e StoryObj da Storybook per definire i meta-dati e i singoli "story" del componente
import type { Meta, StoryObj } from "@storybook/react";

// Importa il componente Input da testare
import { Input } from "../components/Input/Input";

// Definizione dei meta-dati della "storia"
const meta: Meta = {
    // Dove sarà visibile il componente nella sidebar di Storybook
    title: "Components/Input",

    // Parametri di layout di Storybook: centra il componente nella preview
    parameters: {
        layout: "centered",
    },

    // Imposta un argomento di default comune a tutte le storie (label del campo)
    args: {
        label: "Label",
    },

    // Tag utile per l'autodocumentazione (se usi autodocs di Storybook)
    tags: ['autodocs']
};

// Esporta i meta-dati per Storybook
export default meta;

// Definisce un alias per le storie tipizzate con i metadati di sopra
type Story = StoryObj<typeof meta>;


// =======================================
// STORIE
// =======================================

export const Default: Story = {
    render: ({ label }) => (
        <div>
            <Input label={label} kind="text" />
            <Input
                label={label}                // Etichetta del campo
                options={[                  // Opzioni del menu a discesa
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                ]}
                kind="select"               // Specifica che si tratta di un select
            />
            <Input
                label={label}               // Etichetta del gruppo di radio
                options={[                  // Opzioni dei radio button (stessa struttura del select)
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                ]}
                kind="radio"                // Qui chiedi una versione "radio"
                name="Giorgia"              // Nome condiviso per raggruppare i radio
            />
        </div>
    ),
}

// Storia Input base
export const InputStory: Story = {
    // Funzione che restituisce il componente in versione base (input di tipo text)
    render: ({ label }) => <Input label={label} kind="text" />
};

// Storia per la Select
export const Select: Story = {
    // Funzione che restituisce una versione del componente con un select dropdown
    render: ({ label }) => (
        <Input
            label={label}                // Etichetta del campo
            options={[                  // Opzioni del menu a discesa
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
            ]}
            kind="select"               // Specifica che si tratta di un select
        />
    ),
};

// Storia per il Radio
export const Radio: Story = {
    // Funzione che restituisce un esempio con input di tipo radio 
    render: ({ label }) => (
        <Input
            label={label}               // Etichetta del gruppo di radio
            options={[                  // Opzioni dei radio button (stessa struttura del select)
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
            ]}
            kind="radio"                // Qui chiedi una versione "radio"
            name="Giorgia"              // Nome condiviso per raggruppare i radio
        />
    ),
};
