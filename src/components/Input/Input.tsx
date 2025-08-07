/*
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
import root from "react-shadow";

// Importa il CSS raw come stringa per iniettarlo dinamicamente
import css from "./Input.css?raw";

import * as Icon from "react-feather";
import { GlobalStyles } from "../GlobalStyles";


// Definisce le props per un input standard
type InputProps = {
    kind: "text" | "email" | "password"; // Specifica il tipo di input base
    icon?: keyof typeof Icon;
    iconPosition?: "left" | "right";
} & React.InputHTMLAttributes<HTMLInputElement>; // Estende tutte le props standard degli <input>


// Definisce le props per un menu a tendina (select).
type SelectProps = {
    kind: "select"; // Discriminatore per il tipo "select"
    options: { label: string; value: string }[]; // Lista delle opzioni da mostrare nel <select>
    placeholder?: string; // Opzionale: prima opzione disabilitata
    icon?: never;
    iconPosition?: never;
} & React.SelectHTMLAttributes<HTMLSelectElement>; // Props standard di <select>


// Definisce le props per un gruppo di radio button.
type RadioProps = {
    kind: "radio"; // Discriminatore per il tipo "radio"
    options: { label: string; value: string }[]; // Opzioni da mappare come radio buttons
    placeholder?: never; // I radio non supportano placeholder
    icon?: never;
    name: string; // Obbligatorio per raggruppare i radio buttons
    iconPosition?: never;
} & React.InputHTMLAttributes<HTMLInputElement>; // Props standard degli <input>


// Un tipo unione che combina tutti i tipi di input possibili e aggiunge una proprietà `label`,
// che è obbligatoria per tutti.
type GeneralInputProps = (InputProps | SelectProps | RadioProps) & {
    label: React.ReactNode; // Etichetta da mostrare sopra o accanto all'input
    icon?: keyof typeof Icon;
};


// Il componente principale che renderizza l'effettivo elemento di input in base alla prop `kind`.
// Non è pensato per essere usato direttamente, ma per essere incapsulato dal componente `Input`.
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


// Il componente `Input` principale, responsabile di renderizzare l'etichetta e l'`InternalInput`.
// È il componente che dovrebbe essere utilizzato dal resto dell'applicazione.
export const Input: React.FC<GeneralInputProps> = ({ label, id, className, icon, iconPosition, ...props }) => {

    // Usa useId per generare un ID se non è stato passato (NB: questo ignora il valore di `id` se definito)
    const defaultId = React.useId() || id;

    const IconComponent = icon ? Icon[icon] : null;

    return (
        <root.div>
            <GlobalStyles />
            {/* Inietta dinamicamente lo stile CSS del componente */}
            <style>{css}</style>
            <div className={`${className ?? ""} container ${props.kind}`}>
                {/* Se è un gruppo di radio button, mostra il label come semplice testo */}
                {props.kind === "radio" ? (
                    <span>{label}</span>
                ) : (
                    // Altrimenti, crea un elemento <label> associato all'input
                    <label htmlFor={defaultId}>{label}</label>
                )}

                {/* Mostra l’input vero e proprio */}
                <InternalInput {...props} id={defaultId} />
                {IconComponent &&
                    <div className={`icon ${iconPosition || "right"}`} >
                        <IconComponent />
                    </div>}
            </div>
        </root.div>
    )
};