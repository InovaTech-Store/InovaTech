import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FormatoMoney from '../../components/FormatoMoney/FormatoMoney';
import './styles.css';

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const { addToCart } = useOutletContext();
    const navigate = useNavigate();
    const role = sessionStorage.getItem("userRole");

    
    const carregarProdutos = () => {
        fetch("https://69fdcc1830ad0a6fd1c17dca.mockapi.io/produtos")
            .then(res => res.json())
            .then(data => setProdutos(data));
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    
    const handleExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                const response = await fetch(`https://69fdcc1830ad0a6fd1c17dca.mockapi.io/produtos/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    
                    setProdutos(produtos.filter(p => p.id !== id));
                    toast.success("Produto removido com sucesso!");
                } else {
                    toast.error("Erro ao excluir o produto.");
                }
            } catch (error) {
                console.error("Erro ao excluir:", error);
                toast.error("Erro de conexão com o servidor.");
            }
        }
    };

    return (
        <div className="container-lista">
            <h2>Nossos Produtos</h2>
            <section className="produtos">
                <ul className="grid-produtos">
                    {produtos.map((produto) => (
                        <li key={produto.id} className="item-produto">
                            <div className="card">
                                
                                
                                {role === 'owner' && (
                                    <button 
                                        className="btn-excluir-topo" 
                                        onClick={() => handleExcluir(produto.id)}
                                        title="Excluir produto"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                )}

                                <img src={produto.imagem} alt={produto.nome} />
                                
                                <div className="card-body">
                                    <h3>{produto.nome}</h3>
                                    <p className="preco-tag">{FormatoMoney(Number(produto.preco))}</p>

                                    <div className="botoes-container">
                                        <button className="botao-list" onClick={() => navigate(`/Detail/${produto.id}`)}>
                                            Ver Detalhes
                                        </button>

                                        {role === 'customer' ? (
                                            <button className="botao-cart" onClick={() => addToCart(produto)}>
                                                <i className="fa-solid fa-cart-plus"></i> Carrinho
                                            </button>
                                        ) : (
                                            <button className="botao-list" onClick={() => navigate(`/Form/${produto.id}`)}>
                                                Editar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}