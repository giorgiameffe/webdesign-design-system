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
                grid-template-columns: repeat(16, 1fr);
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
            {/* Colori Primitivi */}
            <h2>Primitives</h2>
            <h3>Gray</h3>
            <div className="container">
                {Array.from({ length: 16 }).map((_, index) => (
                    <ClickToCopy
                        style={{ backgroundColor: `var(--color-gray-${index})` }}
                        key={index}
                        value={`var(--color-gray-${index})`}
                    />
                ))}

            </div>

            <h3>Green</h3>
            <div className="container">
                {Array.from({ length: 16 }).map((_, index) => (
                    <ClickToCopy
                        style={{ backgroundColor: `var(--color-green-${index})` }}
                        key={index}
                        value={`var(--color-green-${index})`}
                    />
                ))}

            </div>

            <h3>Red</h3>
            <div className="container">
                {Array.from({ length: 16 }).map((_, index) => (
                    <ClickToCopy
                        style={{ backgroundColor: `var(--color-red-${index})` }}
                        key={index}
                        value={`var(--color-red-${index})`}
                    />
                ))}
            </div>

            {/* Colori Semantici */}
            <h2>Semantic</h2>
            {/* Neautri */}
            <h3>Neutral</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-neutral-bcg)`,
                color: `var(--color-neutral-text)`,
                borderColor: `var(--color-neutral-)`
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-neutral-bgc)"}>
                    --color-neautral-bcg
                </ClickToCopy>,

                <ClickToCopy value={"var(--color-neutral-text)"}>
                    --color-neautral-text
                </ClickToCopy>,
                <ClickToCopy value={"var(--color-neutral-accent)"}>
                    --color-neautral-accent
                </ClickToCopy>
            </div>

            {/* Positivi */}
            <h3>Positive</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-positive-bcg)`,
                color: `var(--color-positive-text)`,
                borderColor: `var(--color-positive-accent)`
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-positive-bgc)"}>
                    --color-positive-bcg
                </ClickToCopy>,

                <ClickToCopy value={"var(--color-positive-text)"}>
                    --color-positive-text
                </ClickToCopy>,
                <ClickToCopy value={"var(--color-positive-accent)"}>
                    --color-positive-accent
                </ClickToCopy>
            </div>

            {/* Neagtivi */}
            <h3>Negative</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-negative-bcg)`,
                color: `var(--color-negative-text)`,
                borderColor: `var(--color-negative-accent)`
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-negative-bgc)"}>
                    --color-negative-bcg
                </ClickToCopy>,

                <ClickToCopy value={"var(--color-negative-text)"}>
                    --color-negative-text
                </ClickToCopy>,
                <ClickToCopy value={"var(--color-negative-accent)"}>
                    --color-negative-accent
                </ClickToCopy>
            </div>
        </div>
}