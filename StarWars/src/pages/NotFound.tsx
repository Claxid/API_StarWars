import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="panel">
      <p className="eyebrow">Erreur 404</p>
      <h2>Page introuvable</h2>
      <p>L'adresse demandée ne correspond à aucune page.</p>
      <Link className="primary-button" to="/">Retour à l'accueil</Link>
    </section>
  );
}
