import { useState } from "react";
import "./LoginPages.css";
import { useNavigate , Link} from "react-router-dom";
import { toast } from "react-toastify";
import Selector from "../../components/Seletor/Seletor";

export default function LoginPages() {
    const navigate = useNavigate();
    
    
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [perfil, setPerfil] = useState("customer"); 

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("https://69fdcc1830ad0a6fd1c17dca.mockapi.io/usuarios");
            const usuarios = await response.json();

            
            const usuarioEncontrado = usuarios.find(u => 
                u.email === inputEmail && 
                u.senha === inputPassword && 
                u.role === perfil 
            );

            if (usuarioEncontrado) {
                sessionStorage.setItem("userRole", usuarioEncontrado.role);
                navigate("/Lista");
            } else {
                alert("Usuário não encontrado para este perfil!");
            }
        } catch (error) {
            console.error("Erro na API:", error);
            alert("Erro ao conectar com o banco de dados.");
        }
    };

    return (
        <div className="container">
            <h1>INOVATECH<span>ELETRÔNICA</span></h1>
            
            
            <Selector active={perfil} setActive={setPerfil} />
            
            <h3>Selecione seu perfil para continuar</h3>
            <form onSubmit={handleLogin} className="form">
                <input 
                    id="loginpage_input_email" 
                    value={inputEmail} 
                    onChange={(event) => setInputEmail(event.target.value)} 
                    placeholder="E-mail" 
                />
                <input 
                    id="loginpage_input_password" 
                    type="password" 
                    placeholder="Senha" 
                    value={inputPassword} 
                    onChange={(event) => setInputPassword(event.target.value)} 
                />
                <button id="loginpage_button_entrar" className="btn-primary" type="submit">Entrar</button>
            </form>
            <strong> Ainda não tem conta? <Link to="/Cadastro">Criar conta</Link></strong>
        </div>
    );
}