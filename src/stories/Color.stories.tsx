import React, { type ButtonHTMLAttributes } from 'react';
// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from '@storybook/react';

// Definire i metadati per la storia
const meta: Meta = {
    title: 'Atoms/Colors', // Nome della sezione/voce nella sidebar di Storybook
    tags: ['autodocs']     // Attiva la generazione automatica della documentazione
}

export default meta;

// Creare un alias di tipo per definire le storie del componente, 
// usando le informazioni contenute nei metadati.
type Story = StoryObj<typeof meta>;

// Componente riutilizzabile che crea un pulsante cliccabile
// che copia il valore passato (es. variabile CSS) negli appunti
const ClickToCopy: React.FC<{ value: string } & ButtonHTMLAttributes<HTMLButtonElement>> = ({ value, ...attrs }) => {
    return (
        <button className='click-to-copy'
            {...attrs} // Propagazione di tutti gli altri attributi HTML del bottone
            style={{ border: 'none', cursor: 'pointer', ...attrs.style }} // Stile di base + eventuali override
            // Quando l'utente clicca sul pulsante, viene eseguita questa funzione
            onClick={() => navigator.clipboard.writeText(value)} // Copia il valore (una stringa) negli appunti del sistema
            aria-label={`Copy ${value}`} // Accessibilità: etichetta per screen reader
        >
        </button>
    )
}

// Definizione della storia principale per visualizzare la palette di colori
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
                background-color: var(--color-gray-5);
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

            {/* Gruppo di grigi (da 0 a 15) */}
            <h3>Gray</h3>
            <div className="container">
                {Array.from({ length: 16 }).map((_, index) => (
                    <ClickToCopy
                        style={{ backgroundColor: `var(--color-gray-${index})` }} // Usa il colore di sfondo corrispondente
                        key={index}
                        value={`var(--color-gray-${index})`} // Valore copiato al clic
                    />
                ))}
            </div>

            {/* Gruppo di verdi (da 0 al 15) */}
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

            {/* Gruppo di rossi (da 0 al 15) */}
            <h3>Red</h3>
            <div className="container">
                {/* Crea un array di 16 elementi (da 0 a 15) e cicla su ciascun indice */}
                {Array.from({ length: 16 }).map((_, index) => (
                    <ClickToCopy
                        style={{ backgroundColor: `var(--color-red-${index})` }} // Imposta lo sfondo del bottone al valore della variabile CSS corrispondente
                        key={index}
                        value={`var(--color-red-${index})`} // La variabile CSS da copiare al clic
                    />
                ))}
            </div>

            {/* Colori Semantici (basati su significato) */}
            <h2>Semantic</h2>

            {/* Colori Neutri */}
            <h3>Neutral</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-neutral-bcg)`, // Sfondo neutro
                color: `var(--color-neutral-text)`,          // Testo neutro
                borderColor: `var(--color-neutral-accent)`   // Bordo neutro
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-neutral-bgc)"}>
                    --color-neutral-bcg
                </ClickToCopy>,

                <ClickToCopy value={"var(--color-neutral-text)"}>
                    --color-neutral-text
                </ClickToCopy>,
                <ClickToCopy value={"var(--color-neutral-accent)"}>
                    --color-neutral-accent
                </ClickToCopy>
            </div>

            {/* Colori Positivi */}
            <h3>Positive</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-positive-bcg)`, // Sfondo positivo
                color: `var(--color-positive-text)`,          // Testo positivo
                borderColor: `var(--color-positive-accent)`   // Bordo positivo
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-positive-bgc)"}>
                    --color-positive-bgc
                </ClickToCopy>,

                <ClickToCopy value={"var(--color-positive-text)"}>
                    --color-positive-text
                </ClickToCopy>,
                <ClickToCopy value={"var(--color-positive-accent)"}>
                    --color-positive-accent
                </ClickToCopy>
            </div>

            {/* Colori Negativi */}
            <h3>Negative</h3>
            <div className="info" style={{
                backgroundColor: `var(--color-negative-bcg)`, // Sfondo negativo
                color: `var(--color-negative-text)`,          // Testo negativo
                borderColor: `var(--color-negative-accent)`   // Bordo negativo
            }}>
                Per questo box abbiamo usato: {''}
                <ClickToCopy value={"var(--color-negative-bgc)"}>
                    --color-negative-bgc
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
