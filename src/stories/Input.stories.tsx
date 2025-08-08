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
    // Questi valori possono essere sovrascritti nelle singole storie se necessario
    args: {
        label: "Label",      // Etichetta predefinita per l'input
        isInvalid: false,    // Stato di validazione predefinito (false = valido)
        disabled: false      // Stato di disabilitazione predefinito (false = attivo)
    },

    // Tag utile per l'autodocumentazione (se usi autodocs di Storybook)
    tags: ['autodocs'],

    // Potresti anche aggiungere 'component: Input' per abilitare il controllo automatico delle props in Docs
    // component: Input
};

// Esporta i meta-dati per Storybook
export default meta;

// Definisce un alias per le storie tipizzate con i metadati di sopra
// In questo modo TypeScript sa che le prop passate a render devono rispettare quelle di Input
type Story = StoryObj<typeof meta>;


// =======================================
// STORIE
// =======================================

// Storia che mostra tutte le varianti dell'input in un unico esempio
export const Default: Story = {
    // La funzione render riceve gli args (label, isInvalid, disabled) già preimpostati da meta.args
    // e li passa a più istanze del componente per mostrare vari tipi di input
    render: ({ label, isInvalid, disabled }) => (
        <div>
            {/* Input standard con icona */}
            <Input
                errorText="Invalid email"           // Testo errore mostrato se isInvalid è true
                isInvalid={isInvalid}               // Stato di errore
                disabled={disabled}                 // Stato disabilitato
                label={label}                       // Etichetta del campo
                kind="email"                        // Tipo HTML input=email
                icon="Book"                         // Nome icona da mostrare
                iconPosition="right"                 // Posizione dell'icona
            />

            {/* Input di tipo select con opzioni */}
            <Input
                isInvalid={isInvalid}
                label={label}                       // Etichetta del campo
                options={[                          // Opzioni del menu a discesa
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                ]}
                kind="select"                       // Specifica che si tratta di un select
                disabled={disabled}
            />

            {/* Input di tipo radio con opzioni */}
            <Input
                isInvalid={isInvalid}
                label={label}                       // Etichetta del gruppo di radio
                options={[                          // Opzioni dei radio button (stessa struttura del select)
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                ]}
                kind="radio"                        // Qui chiedi una versione "radio"
                name="Giorgia"                      // Nome condiviso per raggruppare i radio
                disabled={disabled}
                errorText="Invalid selection"       // Testo errore se isInvalid è true
            />
        </div>
    )
}

// Storia Input base
export const InputStory: Story = {
    // Funzione che restituisce il componente in versione base (input di tipo text)
    // Qui non si passano options o icone, solo le prop principali
    render: ({ label, isInvalid, disabled }) => (
        <Input
            isInvalid={isInvalid}
            label={label}
            kind="text"           // Tipo HTML input=text
            disabled={disabled}
        />
    )
};

// Storia per la Select
export const Select: Story = {
    // Funzione che restituisce una versione del componente con un select dropdown
    // Viene mostrato con due opzioni di esempio
    render: ({ label, isInvalid, disabled }) => (
        <Input
            isInvalid={isInvalid}
            label={label}                       // Etichetta del campo
            options={[                          // Opzioni del menu a discesa
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
            ]}
            kind="select"                       // Specifica che si tratta di un select
            disabled={disabled}
        />
    )
};

// Storia per il Radio
export const Radio: Story = {
    // Funzione che restituisce un esempio con input di tipo radio
    // Ogni radio button condivide lo stesso 'name' per funzionare come gruppo
    render: ({ label, isInvalid, disabled }) => (
        <Input
            isInvalid={isInvalid}
            label={label}                       // Etichetta del gruppo di radio
            options={[                          // Opzioni dei radio button
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
            ]}
            kind="radio"                        // Tipo "radio"
            name="Giorgia"                      // Nome condiviso per raggruppare i radio
            disabled={disabled}
            errorText="Invalid email "          // Testo errore (qui forse andrebbe adattato al contesto radio)
        />
    )
};