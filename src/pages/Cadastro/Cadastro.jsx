import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Selector from "../../components/Seletor/Seletor";
import "./Cadastro.css";

export default function Cadastro() {
    const navigate = useNavigate();
    
    
    const loggedInRole = sessionStorage.getItem("userRole"); 
    const podeCriarDono = loggedInRole === "owner";

    
    const [perfil, setPerfil] = useState("customer"); 
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleCadastro = async (e) => {
        e.preventDefault();

        const novoUsuario = {
            nome,
            email,
            senha,
            role: perfil 
        };

        try {
            const response = await fetch("https://69fdcc1830ad0a6fd1c17dca.mockapi.io/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoUsuario)
            });

            if (response.ok) {
                toast.success(`Usuário ${nome} cadastrado com sucesso!`);
                
                podeCriarDono ? navigate("/Lista") : navigate("/");
            }
        } catch (error) {
            toast.error("Erro ao realizar cadastro.");
        }
    };

    return (
        <div className="container-cadastro">
            <h1>INOVATECH<strong>CADASTRO</strong></h1>
            
            
            {podeCriarDono ? (
                <>
                    <Selector active={perfil} setActive={setPerfil} />
                    <h3>Escolha o perfil do novo usuário</h3>
                </>
            ) : (
                <h3>Crie sua conta de cliente</h3>
            )}

            <form onSubmit={handleCadastro} className="form">
                <input 
                    placeholder="Nome Completo" 
                    required 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                />
                <input 
                    placeholder="E-mail" 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    placeholder="Senha" 
                    type="password" 
                    required 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)} 
                />
                
                <button type="submit" className="btn-cadastrar">Finalizar Cadastro</button>
                
                <button 
                    type="button" 
                    className="btn-voltar-cadastro" 
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </button>
            </form>
            
            
            {!podeCriarDono && (
                <a href="/" className="voltar-link">Já tem conta? Faça login</a>
            )}
        </div>
    );
}