// Importa solo i tipi da React (non la libreria intera, perché non serve qui)
import type React from "react";
// Importa 'root' da 'react-shadow' per usare lo Shadow DOM nei componenti React,
// utile per isolare stili e struttura dal resto dell'app.
import root from "react-shadow";
// Importa il file CSS relativo al componente (contiene gli stili della classe `badge`)
import css from "./Badge.css?raw";

// Definizione dei props che il componente Badge può accettare
type BadgeProps = {
    children: React.ReactNode; // Contenuto interno del badge (testo, icona, ecc.)
    variant?: 'neutral' | 'positive' | 'negative'; // Varianti stilistiche del badge (opzionale, default = 'neutral')
} & React.HTMLAttributes<HTMLDivElement>; // Permette l’uso di tutti gli attributi HTML validi per un <div> (es: className, id, onClick, ecc.)

// Definizione del componente Badge come Functional Component (React.FC)
// React.FC => è un tipo fornito da React per tipizzare i componenti funzionali.
export const Badge: React.FC<BadgeProps> = ({
    children,            // Contenuto passato tra i tag <Badge>...</Badge>
    variant = 'neutral', // Se non viene specificata la variante, usa "neutral" come default
    ...attrs             // Raccoglie tutti gli altri attributi HTML (es: className, style, ecc.)
}) => {
    return (

        // Crea un contenitore con Shadow DOM usando react-shadow
        <root.div>
            {/* Inserisce gli stili CSS all'interno dello Shadow DOM */}
            <style>{css}</style>
            {/* {Applica classi CSS dinamiche: "badge" + nome variante ("neutral", "positive", ecc.)
             E passa anche tutti gli attributi raccolti con ...attrs} */}
            <div className={`badge ${variant}`} {...attrs}>
                {children} {/* Inserisce il contenuto all'interno del badge */}
            </div>
        </root.div>
    );
}