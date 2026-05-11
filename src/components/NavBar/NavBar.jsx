import { NavLink } from 'react-router-dom';

export default function NavBar({ menuAberto }) {
    return (
        <nav className={`navbar ${menuAberto ? 'active' : ''}`}>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/Form" className="nav-link">Cadastrar Produto</NavLink>
        </nav>
    )
}