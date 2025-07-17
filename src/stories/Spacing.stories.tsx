import React from 'react';
// Importare i tipi necessari da Storybook per definire i metadati e le storie
import type { Meta, StoryObj } from '@storybook/react';

// Definire i metadati per il componente 'Badge'.
// - `title` è il nome che apparirà nella sidebar di Storybook.
// - `component` è il componente React da visualizzare e testare.
// - `parameters.layout: 'centered'` centra il componente nel canvas.
// - `tags: ['autodocs']` abilita la documentazione automatica.
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


//  Componente che calcola e restituisce il valore effettivo di una variabile CSS
//  leggendo lo stile calcolato di `document.body`.
//  Props = value: il nome della custom property CSS da cercare (es. "--spacing-sm").

const SpaceCalc = ({ value }: { value: string }) => {

    // Usa useMemo per calcolare il valore una sola volta (o quando `value` cambia)
    const spacing = React.useMemo(() => {
        // Ottiene gli stili calcolati del tag <body> usando il DOM
        // `document.body` è il riferimento al corpo del documento HTML
        // `getComputedStyle()` restituisce tutti gli stili CSS già risolti (in pixel, rem, ecc.)
        const bodyStyle = window.getComputedStyle(document.body);
        // Estrae il valore della variabile CSS passata tramite `value` (es: "--spacing-sm")
        // Restituisce il valore effettivo, ad esempio "8px" o "1rem"
        return bodyStyle.getPropertyValue(value);
    }, [value])

    return <span>{spacing}</span>;
}


//  Componente di stile inline che inietta regole CSS personalizzate
//  per il layout e la visualizzazione della lista `dl`.
//  Nota: qui vengono definiti stili per `dl`, `dt`, `dd` e `.info`.

const Style: React.FC = () => {

    return (
        <style>
            {
                `dl {
                font-size: 1rem;
                border: 1px solid #ccc;
                display: grid;
                max-width: calc(550rem/16);
                grid-template-columns: 1fr 1fr 1fr;
                border-bottom: none;
                border-radius: 0.5rem;
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
                displaY: grid;
                gap: 1ch;
                grid-template-columns: subgrid;
                grid-column: 2/4;
                align-items: center;
                }

                .info {
                background: magenta;
                height: 1ch;
                width: var(--story-spacing);
                display: block;          
                }
                `
            }
        </style>
    )
}


// Storia di default per il componente "Spacing".
// Crea una descrizione visiva delle variabili CSS di spaziatura, mostrandone:
// Il nome (es. "sm", "md", ecc.)
// Il valore calcolato della variabile
// Un elemento `.info` con larghezza dinamica basata sulla variabile stessa

export const Default: Story = {
    render: () => (

        <>
            <Style />
            <dl>
                {['zero', 'xs', 'sm', 'md', 'lg', 'xl'].map((key) => (
                    <React.Fragment key={key}>
                        {/* Nome della variabile */}
                        <dt>{key}</dt>
                        {/* 
                          Valore della variabile, visualizzato tramite SpaceCalc.
                          Viene anche assegnata una variabile CSS custom '--story-spacing' 
                          usata nello stile del blocco colorato `.info`
                        */}
                        <dd style={{ ['--story-spacing' as any]: `var(--spacing-${key})` }}>
                            <span>
                                <SpaceCalc value={`--spacing-${key}`} />
                            </span>
                            <span className="info" />
                        </dd>
                    </React.Fragment>
                ))}
            </dl>
        </>
    )
};