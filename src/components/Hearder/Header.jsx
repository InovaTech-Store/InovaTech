import { useState } from "react";
import "./Header.css";
import logo from "../../../public/image/logo.png.png";
import { useNavigate, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Header({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false);
  const role = sessionStorage.getItem("userRole");
const navigate = useNavigate();
  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="cabecalho">
        <div className="logoContainer">
          <img src={logo} alt="Logo Inovatech" className="logo" />
          <h1>INOVATECH<span>ELETRÔNICA</span></h1>
        </div>
        

  
        <div className="header-actions">
        {role === 'customer' && (
          <button className="cart-trigger" onClick={onOpenCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
        )}
        

        <button className="iconButton" onClick={() => setOpen(!open)}>
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

   
        <nav className={`navMenu ${open ? "open" : ""}`}>
          <ul>
            {role === 'owner' && (
            <li><NavLink to="/Form" onClick={closeMenu}>Cadastrar</NavLink></li>
            )}
            <li><NavLink to="/Lista" onClick={closeMenu}>Produtos</NavLink></li>
            {role === 'owner' && (
                    <Link to="/Cadastro" className="nav-link-admin">
                         <i className="fa-solid fa-user-plus"></i> Novo Usuário
                    </Link>
                )}
            
            <li><NavLink to="/" onClick={closeMenu}>Sair</NavLink></li>
          </ul>
        </nav>

   
        <div
          className={`overlay ${open ? "showOverlay" : ""}`}
          onClick={closeMenu}
        />
      </header>
    </>
  );
}