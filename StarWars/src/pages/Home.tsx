import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="hero">
            <p className="eyebrow">Projet Star Wars</p>
            <h2>Découvrez tous les personnages de l'univers Star Wars</h2>
            <p>Page d'accueil, carte des personnages et page 404.</p>
            <Link className="primary-button" to="/characters">
                Voir les personnages
            </Link>
        </section>
    );
}