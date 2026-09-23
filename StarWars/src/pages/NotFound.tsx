import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="panel">
      <p className="eyebrow">404 Error</p>
      <h2>Page not found</h2>
      <p>The requested address does not match any page.</p>
      <Link className="primary-button" to="/">Back to home</Link>
    </section>
  );
}
