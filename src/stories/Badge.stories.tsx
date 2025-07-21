// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from '@storybook/react';

// Importare il componente React da documentare in Storybook
import { Badge } from "../components/Badge/Badge";

// Definire i metadati per il componente 'Badge'.
// - `title` è il nome che apparirà nella sidebar di Storybook.
// - `component` è il componente React da visualizzare e testare.
const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    argTypes: {
        children: { control: 'text' }
    },
    args: {
        children: 'Badge'
    },
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

// Esportare i metadati come default
export default meta;

// Creare un alias di tipo per definire le storie del componente, usando le informazioni contenute nei metadati.
// `StoryObj<typeof meta>` è un tipo fornito da Storybook per tipizzare correttamente una storia.
// Usa `meta` per sapere qual è il componente e quali props accetta.
type Story = StoryObj<typeof meta>;

// Definire una storia chiamata 'Default' per il componente 'Badge'.
export const Default: Story = {
    // La proprietà `render` è una funzione che restituisce il JSX del componente da visualizzare.
    // In questo caso, il componente <Badge /> viene renderizzato così com'è, con le sue impostazioni predefinite.
    // È utile per mostrare il comportamento del componente in uno stato "standard".
    render: ({ children, variant }) =>
        <Badge variant={variant}>{children}</ Badge>
}

export const AllBadges: Story = {

    render: ({ children }) => (

        <>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <Badge variant='neutral'>{children}</Badge>
                <Badge variant='positive'>{children}</Badge>
                <Badge variant='negative'>{children}</Badge>
            </div>
        </>
    ),
};

