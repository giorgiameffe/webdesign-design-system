import React, { type ButtonHTMLAttributes } from 'react';
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

const ClickToCopy: React.FC<{ value: string } & ButtonHTMLAttributes<HTMLButtonElement>> = ({ value, ...attrs }) => {
    return (
        <button className='click-to-copy'
            {...attrs}
            style={{ border: 'none', cursor: 'pointer', ...attrs.style }}
            onClick={() => navigator.clipboard.writeText(value)}
            aria-label={`Copy ${value}`}
        >
        </button>
    )
}

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
            <h2>Primitive Colors</h2>
            <h3>Gray</h3>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ClickToCopy className="info"
                        style={{ backgroundColor: `var(--color-gray-${index})` }}
                        key={index}
                        value={`var(--color-gray-${index})`}
                    />
                ))}

            </div>

            <h3>Green</h3>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ClickToCopy className="info"
                        style={{ backgroundColor: `var(--color-green-${index})` }}
                        key={index}
                        value={`var(--color-green-${index})`}
                    />
                ))}

            </div>

            <h3>Red</h3>
            <div className="container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ClickToCopy className="info"
                        style={{ backgroundColor: `var(--color-red-${index})` }}
                        key={index}
                        value={`var(--color-red-${index})`}
                    />
                ))}

            </div>
        </div>
}