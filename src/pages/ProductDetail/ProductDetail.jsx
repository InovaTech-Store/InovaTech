import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import './styles.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Pegamos a função de adicionar ao carrinho do AppLayout
    const { addToCart } = useOutletContext(); 
    const role = sessionStorage.getItem("userRole"); // Pega o perfil para saber se mostra o botão

    // Novos estados para o MockAPI
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Busca apenas o produto com este ID específico lá no MockAPI
        fetch(`https://69fdcc1830ad0a6fd1c17dca.mockapi.io/produtos/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Produto não encontrado");
                return res.json();
            })
            .then((data) => {
                setProduto(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setProduto(null);
                setLoading(false);
            });
    }, [id]);

    // Tela de carregamento enquanto busca na internet
    if (loading) {
        return (
            <div className="container-detail">
                <h1>Carregando detalhes do produto...</h1>
            </div>
        );
    }

    // Se a busca falhar ou o ID não existir
    if (!produto) {
        return (
            <div className="container-detail">
                <h1>Produto não encontrado</h1>
                <button className="back-button" onClick={() => navigate('/Lista')}>Voltar para a Lista</button>
            </div>
        );
    }

    // O MockAPI pode salvar o preço como String, então garantimos que seja Número para fazer as contas
    const precoNumero = Number(produto.preco);

    return (
        <div className="container-detail">
            <div className="cardDetail">
                <div className="image-section">
                    <img src={produto.imagem} alt={produto.nome} />
                </div>
                
                <div className="info-section">
                    <span className="category-tag">Eletrônicos</span>
                    <h1>{produto.nome}</h1>
                    <p className="description">{produto.descricao}</p>
                    
                    <div className="price-container">
                        <span className="price-label">Preço à vista</span>
                        
                        <h2 className="price-value">
                            R$ {precoNumero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>
                        <p className="installments">ou 10x de R$ {(precoNumero / 10).toFixed(2)} sem juros</p>
                    </div>

                    {/* SÓ MOSTRA O BOTÃO DE COMPRAR SE FOR CLIENTE */}
                    {role === 'customer' && (
                        <button 
                            className="buy-button"
                            onClick={() => {
                                addToCart(produto);
                                alert(`${produto.nome} adicionado ao carrinho!`);
                            }}
                        >
                            Adicionar ao Carrinho
                        </button>
                    )}
                  
                    <button className="buy-button-voltar" onClick={() => navigate(-1)}>
                        ← Voltar
                    </button>
                    
                    <div className="shipping-info">
                        <span>🚚 Frete grátis para todo o Brasil</span>
                    </div>
                </div>
            </div>
        </div>
    );
}