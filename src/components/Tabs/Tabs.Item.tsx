// Definisce le proprietà accettate da <Item />
// - label: etichetta del tab, può essere testo, JSX, o qualunque nodo React
// - children: il contenuto del pannello/tab, qualsiasi elemento React
export interface ItemProps {
    label: React.ReactNode;
    children: React.ReactNode;
}

// Componente funzionale React che rappresenta un singolo tab/pannello
// Riceve le props definite sopra e renderizza solo il contenuto (children)
export const Item: React.FC<ItemProps> = ({ children }) => {
    return <div>{children}</div>;  // Wrappa il contenuto in un <div>
};
