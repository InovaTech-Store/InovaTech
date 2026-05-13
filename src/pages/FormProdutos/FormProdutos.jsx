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

    const [uploadMode, setUploadMode] = useState('url'); 

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 500000) { 
                toast.warning("Imagem muito grande! Tente uma menor para não sobrecarregar o banco.");
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imagem: reader.result }));
            };
            reader.readAsDataURL(file);
        }
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
                toast.success(id ? "Produto atualizado!" : "Produto cadastrado!", {
                    style: { background: id ? "#007bff" : "#2ecc71", color: "#fff" }
                });
                navigate('/Lista');
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Erro ao salvar os dados.");
        }
    };

    return (
        <div className="form-wrapper">
            <h1>{id ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                
                <div className="form-group">
                    <label htmlFor="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>


                <div className="form-group">
                    <label>Imagem do Produto:</label>
                    
                    <div className="toggle-image-mode">
                        <button 
                            type="button" 
                            className={uploadMode === 'url' ? 'active' : ''} 
                            onClick={() => setUploadMode('url')}
                        >
                            Link da Internet
                        </button>
                        <button 
                            type="button" 
                            className={uploadMode === 'file' ? 'active' : ''} 
                            onClick={() => setUploadMode('file')}
                        >
                            Subir do Dispositivo
                        </button>
                    </div>

                    {uploadMode === 'url' ? (
                        <input
                            type="url"
                            name="imagem"
                            value={formData.imagem.startsWith('data:') ? '' : formData.imagem}
                            onChange={handleChange}
                            placeholder="Ex: https://linkdaimagem.com/foto.jpg"
                        />
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    )}


                    {formData.imagem && (
                        <div className="image-preview">
                            <p>Preview:</p>
                            <img src={formData.imagem} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="preco">Preço (R$):</label>
                    <input type="number" id="preco" name="preco" step="0.01" value={formData.preco} onChange={handleChange} required />
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