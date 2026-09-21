import {Link, useNavigate} from "react-router-dom";

export default function Home(){
const navigate = useNavigate()

const handleClick = () => {
    console.log('Home cliqué')

    return <section className="hero"><p className="eyebrow"> projet Star Wars</p>
<h2>Découvrez tous les personnages de l'univers Star Wars</h2><p>pages home _ carte personnage et page 404.</p>
<Link className="primary-button" to="/characters">Voir les personnages </Link></section>} }