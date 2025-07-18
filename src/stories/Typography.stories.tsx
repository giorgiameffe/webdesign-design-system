// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from "@storybook/react";

// Definire i metadati.
// - `title` è il nome che apparirà nella sidebar di Storybook.
// - `parameters.layout: 'centered'` centra il componente nel canvas.
// - `tags: ['autodocs']` abilita la documentazione automatica.

const meta: Meta = {
    title: 'Atoms/Typography',
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export default meta;

// Creare un alias di tipo per definire le storie del componente, usando le informazioni contenute nei metadati.
// `StoryObj<typeof meta>` è un tipo fornito da Storybook per tipizzare correttamente una storia.
// Usa `meta` per sapere qual è il componente e quali props accetta.

type Story = StoryObj<typeof meta>;

// Definizione di una story per Storybook
// Mostra una serie di elementi HTML con classi tipografiche personalizzate

export const Default: Story = {
    // Argomenti predefiniti per la story (props)
    args: {
        // 'children' rappresenta il testo da mostrare nei vari elementi
        children: 'The quick brown fox'
    },

    // Funzione che renderizza l'interfaccia visiva della story
    render: ({ children }) => (
        <>
            {/* Esempio di uso di una classe personalizzata per un font grande (hero) */}
            <div className="font-size-hero">{children}</div>

            {/* Elementi HTML da h1 a h6 per visualizzare la gerarchia tipografica intestazioni */}
            <h1>{children}</h1>
            <h2>{children}</h2>
            <h3>{children}</h3>
            <h4>{children}</h4>
            <h5>{children}</h5>
            <h6>{children}</h6>

            {/* Classi personalizzate per altre dimensioni di font comuni */}
            <div className="font-size-body">{children}</div>
            <div className="font-size-sm">{children}</div>
            <div className="font-size-xs">{children}</div>
        </>
    )
}
