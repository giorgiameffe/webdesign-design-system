// Importa il file CSS di reset come stringa raw (testo puro)
import reset from "../styles/reset.css?raw";

// Importa il file CSS di tipografia come stringa raw
import typography from "../styles/typography.css?raw";

// Componente React che inietta gli stili globali nella pagina
export const GlobalStyles = () => {
    return (
        // Inserisce entrambi i CSS come contenuto dentro un tag <style>
        // Serve per applicare globalmente reset e tipografia nel DOM o nello Shadow DOM
        <style>{`${reset} ${typography}`}</style>
    );
};
