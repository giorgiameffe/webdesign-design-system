import type React from "react";
import "./Badge.css";

type BadgeProps = {
    children: React.ReactNode;
    variant?: 'neutral' | 'positive' | 'negative';
} & React.HTMLAttributes<HTMLDivElement>;

// Definizione del componente Badge come Functional Component (React.FC)
// React.FC => è un tipo fornito da React per tipizzare i componenti funzionali.
export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    ...attrs

}) => {
    return <div className={`badge ${variant}`} {...attrs}>
        {children}
    </div>
}