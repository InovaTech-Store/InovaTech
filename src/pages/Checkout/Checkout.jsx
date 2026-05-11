import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import './Checkout.css';



export default function Checkout() {
    const { cartItems, clearCart } = useOutletContext(); // clearCart é uma boa função ter no AppLayout
    const navigate = useNavigate();
    
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        endereco: '',
        pagamento: 'cartao'
    });

    const total = cartItems.reduce((acc, item) => acc + (Number(item.preco) || 0), 0);

const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Seu carrinho está vazio!");
            return;
        }

        // 1. Organizamos os parâmetros
        const templateParams = {
            to_name: dados.nome,
            to_email: dados.email, 
            address: dados.endereco,
            total_price: total.toFixed(2),
        };

        // Mostra um aviso de "processando" para o usuário não clicar duas vezes
        const idToast = toast.loading("Finalizando seu pedido...");

        // 2. Enviamos o e-mail
        emailjs.send(
            'service_wgodlmm',   
            'template_cr0ikcb',  
            templateParams,
            'v9GnQfUkRYKxf8-7p'    
        )
        .then((response) => {
            // SÓ ENTRA AQUI SE O EMAIL FOR ENVIADO COM SUCESSO
            toast.update(idToast, { 
                render: `Sucesso! Confirmado para ${dados.email}`, 
                type: "success", 
                isLoading: false, 
                autoClose: 5000 
            });

            if(clearCart) clearCart(); // Limpa o carrinho
            navigate('/Lista');        // Redireciona
        })
        .catch((err) => {
            // ENTRA AQUI SE O EMAIL FALHAR
            console.error("Erro completo do EmailJS:", err);
            console.log("Dados que serão enviados:", dados);
            toast.update(idToast, { 
                render: "Erro ao enviar e-mail de confirmação.", 
                type: "error", 
                isLoading: false, 
                autoClose: 5000 
            });
        });
    };

    return (
        <div className="checkout-container">
            <h2>Finalizar seu Pedido</h2>
            
            <div className="checkout-grid">
                {/* FORMULÁRIO */}
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label>Nome Completo:</label>
                        <input type="text" required onChange={(e) => setDados({...dados, nome: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label>E-mail para confirmação:</label>
                        <input type="email" required onChange={(e) => setDados({...dados, email: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label>Endereço de Entrega:</label>
                        <textarea required onChange={(e) => setDados({...dados, endereco: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label>Forma de Pagamento:</label>
                        <select onChange={(e) => setDados({...dados, pagamento: e.target.value})}>
                            <option value="cartao">Cartão de Crédito</option>
                            <option value="pix">PIX</option>
                            <option value="boleto">Boleto Bancário</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-concluir">Concluir Compra</button>
                </form>

                {/* RESUMO DO PEDIDO */}
                <div className="checkout-summary">
                    <h3>Resumo do Pedido</h3>
                    <div className="summary-items">
                        {cartItems.map((item, idx) => (
                            <p key={idx}>{item.nome} - R$ {Number(item.preco).toFixed(2)}</p>
                        ))}
                    </div>
                    <hr />
                    <div className="summary-total">
                        <strong>Total: R$ {total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}