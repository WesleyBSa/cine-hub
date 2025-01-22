import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link className="logo" to="/">CineHub</Link>
            <div className="nav-links">
                <Link to="/favoritos">Meus Filmes</Link>
                <Link to="/lancamentos">Lançamentos</Link>
                <Link to="/melhores">Melhores Avaliados</Link>
                <Link to="/popular">Populares</Link>
            </div>
        </header>
    );
}

export default Header;
