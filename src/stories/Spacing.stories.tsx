import React from 'react';
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

const SpaceCalc = ({ value }: { value: string }) => {

    const spacing = React.useMemo(() => {

        const bodyStyle = window.getComputedStyle(document.body);
        return bodyStyle.getPropertyValue(value);
    }, [value])

    return <span>{spacing}</span>;
}

const Style: React.FC = () => {

    return (
        <style>
            {
                `dl {
                font-size: 1rem;
                border: 1px solid #ccc;
                display: grid;
                max-width: calc(550rem/16);
                grid-template-columns: 1fr 1fr;
                border-bottom: none;
                border-radious: 0.5 rem;
                }

                dt {
                font-weight: 600;
                padding: var(--spacing-sm) var(--spacing-md);
                border-bottom: 1px solid #ccc; 
                }

                dd {
                padding: var(--spacing-sm) var(--spacing-md);
                border-bottom: 1px solid #ccc; 
                font-family: monospace;
                }
                `
            }
        </style>
    )
}

export const Default: Story = {
    render: () => (

        <>
            <Style />
            <dl>
                {['zero', 'xs', 'sm', 'md', 'lg', 'xl'].map((key) => (
                    <React.Fragment key={key}>
                        <dt>{key}</dt>
                        <dd>
                            <SpaceCalc value={`--spacing-${key}`} />
                        </dd>
                    </React.Fragment>
                ))}
            </dl>
        </>
    )
};