import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

export default function FormProdutos() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    
    const API_URL = "https://69fdcc1830ad0a6fd1c17dca.mockapi.io/produtos";

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        imagem: ''
    });

    
    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        nome: data.nome,
                        descricao: data.descricao,
                        preco: data.preco,
                        imagem: data.imagem || ''
                    });
                })
                .catch(() => toast.error("Erro ao carregar produto para edição"));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosProduto = {
            ...formData,
            preco: parseFloat(formData.preco),
            
            imagem: formData.imagem || "https://placehold.co/600x400?text=Sem+Imagem"
        };

        try {
            let response;

            if (id) {
                
                response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosProduto)
                });
            } else {
                
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosProduto)
                });
            }

            if (response.ok) {
                toast.success(id ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!", {
                    style: { background: id ? "#007bff" : "#2ecc71", color: "#fff" }
                });
                navigate('/Lista');
            } else {
                throw new Error();
            }

        } catch (error) {
            toast.error("Erro ao salvar os dados. Tente novamente.");
        }
    };

    return (
        <div className="form-wrapper">
            <h1>{id ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome do Produto:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagem">Link da Imagem (URL):</label>
                    <input
                        type="url"
                        id="imagem"
                        name="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                        placeholder="Ex: https://linkdaimagem.com/foto.jpg"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="preco">Preço (R$):</label>
                    <input
                        type="number"
                        id="preco"
                        name="preco"
                        step="0.01"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    {id ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </button>

                <button type="button" className="buy-button-cancel" onClick={() => navigate(-1)} >
                    Cancelar
                </button>
            </form>
        </div>
    );
}