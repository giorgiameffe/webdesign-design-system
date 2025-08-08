/*
  Esempi di utilizzo del componente:

  <Input kind="text" placeholder="Placeholder" label="Label" name="name" />
  <Input kind="select" label="Label" name="name" options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
        ]}
  />
  <Input kind="radio" label="Label" name="name" options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
        ]}
  />
*/

// Importa React per poter usare JSX e gli hook (come useId)
import React from "react";

// Importa react-shadow per creare un Shadow DOM
// In questo caso viene usato `root.div` per incapsulare l'intero componente e isolare gli stili
import root from "react-shadow";

// Importa il CSS raw come stringa per iniettarlo dinamicamente
// Il `?raw` fa sì che il CSS venga importato come testo anziché come modulo
import css from "./Input.css?raw";

// Importa tutte le icone di react-feather come oggetto "Icon"
import * as Icon from "react-feather";

// Stili globali condivisi per tutti i componenti (iniettati anche nel Shadow DOM)
import { GlobalStyles } from "../GlobalStyles";


// Definisce le props per un input standard
type InputProps = {
    kind: "text" | "email" | "password"; // Specifica il tipo di input base
    icon?: keyof typeof Icon;            // Nome dell'icona da mostrare (opzionale)
    iconPosition?: "left" | "right";     // Posizione dell'icona rispetto al campo
} & React.InputHTMLAttributes<HTMLInputElement>; // Estende tutte le props standard degli <input>


// Definisce le props per un menu a tendina (select).
type SelectProps = {
    kind: "select"; // Discriminatore per il tipo "select"
    options: { label: string; value: string }[]; // Lista delle opzioni da mostrare nel <select>
    placeholder?: string; // Opzionale: prima opzione disabilitata con testo placeholder
    icon?: never;          // Per evitare di passare icona a un select
    iconPosition?: never;
} & React.SelectHTMLAttributes<HTMLSelectElement>; // Props standard di <select>


// Definisce le props per un gruppo di radio button.
type RadioProps = {
    kind: "radio"; // Discriminatore per il tipo "radio"
    options: { label: string; value: string }[]; // Opzioni da mappare come radio buttons
    placeholder?: never; // I radio non supportano placeholder
    icon?: never;        // Per evitare di passare icona a un radio
    name: string;        // Obbligatorio per raggruppare i radio buttons
    iconPosition?: never;
} & React.InputHTMLAttributes<HTMLInputElement>; // Props standard degli <input>


// Un tipo unione che combina tutti i tipi di input possibili e aggiunge proprietà comuni:
// - label obbligatoria
// - icon (solo per input base)
// - errorText e isInvalid per gestione errori e validazione
type GeneralInputProps = (InputProps | SelectProps | RadioProps) & {
    label: React.ReactNode;   // Etichetta da mostrare sopra o accanto all'input
    icon?: keyof typeof Icon; // Nome icona (solo se applicabile)
    errorText?: React.ReactNode; // Testo errore da mostrare sotto al campo
    isInvalid?: boolean;         // Stato di errore visuale (classe CSS aggiuntiva)
};


// Componente "interno" che renderizza il campo vero e proprio in base alla prop `kind`
// Non gestisce label, errori o contenitore, solo l'elemento di input puro
export const InternalInput: React.FC<InputProps | SelectProps | RadioProps> = (
    props
) => {
    // Controlla il tipo di input da renderizzare usando il discriminatore "kind"
    switch (props.kind) {
        // Caso per il tipo "select": crea un elemento <select> con tutte le props passate
        case "select":
            return (
                <select {...props}>
                    {/* Se è definito un placeholder, lo inserisce come prima option disabilitata */}
                    {props.placeholder && (
                        <option value="" disabled selected>
                            {props.placeholder}
                        </option>
                    )}
                    {/* Mappa le opzioni e le visualizza */}
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        // Caso per il tipo "radio": genera un gruppo di radio button con etichette associate
        case "radio":
            return (
                <>
                    {/* Per ogni opzione, crea un input radio con etichetta */}
                    {props.options.map((option) => (
                        <label key={option.value}>
                            <input type="radio" {...props} value={option.value} />
                            {option.label}
                        </label>
                    ))}
                </>
            );
        default:
            // Per input base (text, email, password), restituisce un normale input
            return <input type={props.kind} {...props} />;
    }
};


// Componente `Input` principale
// Gestisce:
// - etichetta
// - icona
// - stato di errore
// - contenitore con classi dinamiche
// - incapsulamento in Shadow DOM con stili globali
export const Input: React.FC<GeneralInputProps> = ({
    label,
    id,
    className,
    icon,
    iconPosition,
    errorText,
    isInvalid,
    ...props
}) => {

    // Genera un ID univoco (serve per collegare <label> e <input>)
    // NB: in questa implementazione, se viene passato `id` non viene usato perché si prende sempre il valore di useId
    const defaultId = React.useId() || id;

    // Recupera il componente icona da react-feather in base alla stringa passata
    const IconComponent = icon ? Icon[icon] : null;

    return (
        // `root.div` crea un div incapsulato in un Shadow DOM
        <root.div>
            {/* Applica stili globali anche all’interno dello Shadow DOM */}
            <GlobalStyles />
            {/* Inietta dinamicamente il CSS specifico del componente */}
            <style>{css}</style>

            {/* Contenitore principale con classi dinamiche per tipo e stato */}
            <div className={`${className ?? ""} container ${props.kind} ${isInvalid ? "is-invalid" : ""}`}>
                {/* Se è un gruppo di radio button, mostra l’etichetta come semplice testo */}
                {props.kind === "radio" ? (
                    <span className="label">{label}</span>
                ) : (
                    // Per altri tipi, crea un <label> collegato all’input
                    <label htmlFor={defaultId}>{label}</label>
                )}

                {/* Contenitore per input + eventuale icona */}
                <div className="input-container">
                    {/* L'input effettivo */}
                    <InternalInput {...props} id={defaultId} />
                    {/* Se c'è un'icona, la mostra nella posizione specificata */}
                    {IconComponent && (
                        <div className={`icon ${iconPosition || ""}`}>
                            <IconComponent />
                        </div>
                    )}
                </div>

                {/* Mostra il testo di errore se presente */}
                {errorText && <span className="error-text">{errorText}</span>}
            </div>
        </root.div >
    )
};