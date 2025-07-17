// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from '@storybook/react';

// Definire i metadati per il componente 'Badge'.
// - `title` è il nome che apparirà nella sidebar di Storybook.
// - `component` è il componente React da visualizzare e testare.
const meta: Meta = {
    title: 'Atoms/Spacing',
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export default meta;

// Creare un alias di tipo per definire le storie del componente, usando le informazioni contenute nei metadati.
// `StoryObj<typeof meta>` è un tipo fornito da Storybook per tipizzare correttamente una storia.
// Usa `meta` per sapere qual è il componente e quali props accetta.
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => <div>Spacing</div>
};