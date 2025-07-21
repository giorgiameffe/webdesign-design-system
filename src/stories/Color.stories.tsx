// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from '@storybook/react';

// Definire i metadati per la storia
const meta: Meta = {
    title: 'Atoms/Colors',
    tags: ['autodocs']
}

export default meta;

// Creare un alias di tipo per definire le storie del componente, 
// usando le informazioni contenute nei metadati.
type Story = StoryObj<typeof meta>;

// Definire storia `Default` per i colori
export const Default: Story = {
    render: () =>
        <div>
            <style>
                {
                    `
                .container {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                height: 3rem;
                margin-bottom: var(--spacing-lg);
                }

                .info {
                padding: var(--spacing-md);
                backgroud-color: var(--color-gray-5);
                color: var(--color-gray-10);
                margin-bottom: var(--spacing-lg);
                border: 1px solid var(--color-gray-3);
                border-radius: var(--border-radius-sm, 0.25rem);
                }
                `
                }
            </style>

            <h1>Colors</h1>

            <h2>Gray</h2>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="info"
                        style={{ backgroundColor: `var(--color-gray-${index})` }}
                        key={index}
                    />
                ))}

            </div>

            <h2>Green</h2>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="info"
                        style={{ backgroundColor: `var(--color-green-${index})` }}
                        key={index}
                    />
                ))}

            </div>

            <h2>Red</h2>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="info"
                        style={{ backgroundColor: `var(--color-red-${index})` }}
                        key={index}
                    />
                ))}

            </div>
        </div>
}