import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormatoMoney from '../../components/FormatoMoney/FormatoMoney';
import emailjs from '@emailjs/browser';
import './Checkout.css';

export default function Checkout() {
    const { cartItems, clearCart } = useOutletContext(); 
    const navigate = useNavigate();
    
  
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        telefone: '',
        rua: '',
        numero: '',
        bairro: '',
        pontoReferencia: '',
        pagamento: 'cartao'
    });

    const total = cartItems.reduce((acc, item) => acc + (Number(item.preco) || 0), 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Seu carrinho está vazio!");
            return;
        }


        const listaProdutosEmail = cartItems
            .map(item => `${item.nome} (${FormatoMoney(Number(item.preco))})`)
            .join(', ');

        // 3. Objeto de parâmetros para o EmailJS (deve bater com as tags {{}} do seu template)
        const templateParams = {
            to_name: dados.nome,
            to_email: dados.email,
            phone: dados.telefone,
            full_address: `${dados.rua}, Nº ${dados.numero} - Bairro: ${dados.bairro}`,
            reference_point: dados.pontoReferencia,
            payment_method: dados.pagamento.toUpperCase(),
            product_list: listaProdutosEmail,
            total_price: FormatoMoney(total),
        };

        const idToast = toast.loading("Finalizando seu pedido...");

        emailjs.send(
            'service_wgodlmm',   
            'template_cr0ikcb',  
            templateParams,
            'v9GnQfUkRYKxf8-7p'    
        )
        .then(() => {
            toast.update(idToast, { 
                render: `Sucesso! Confirmado para ${dados.email}`, 
                type: "success", 
                isLoading: false, 
                autoClose: 5000 
            });

            if(clearCart) clearCart(); 
            navigate('/Lista');        
        })
        .catch((err) => {
            console.error("Erro EmailJS:", err);
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
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label>Nome Completo:</label>
                        <input type="text" required onChange={(e) => setDados({...dados, nome: e.target.value})} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>E-mail:</label>
                            <input type="email" required onChange={(e) => setDados({...dados, email: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Telefone / WhatsApp:</label>
                            <input type="tel" placeholder="(00) 00000-0000" required onChange={(e) => setDados({...dados, telefone: e.target.value})} />
                        </div>
                    </div>

                    <h3 className="section-title">Endereço de Entrega</h3>
                    
                    <div className="form-row">
                        <div className="form-group" style={{flex: 3}}>
                            <label>Rua/Avenida:</label>
                            <input type="text" required onChange={(e) => setDados({...dados, rua: e.target.value})} />
                        </div>
                        <div className="form-group" style={{flex: 1}}>
                            <label>Número:</label>
                            <input type="text" required onChange={(e) => setDados({...dados, numero: e.target.value})} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Bairro:</label>
                        <input type="text" required onChange={(e) => setDados({...dados, bairro: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label>Ponto de Referência:</label>
                        <input type="text" placeholder="Ex: Próximo ao mercado..." onChange={(e) => setDados({...dados, pontoReferencia: e.target.value})} />
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

                <div className="checkout-summary">
                    <h3>Resumo do Pedido</h3>
                    <div className="summary-items">
                        {cartItems.map((item, idx) => (
                            <p key={idx}>{item.nome} - {FormatoMoney(Number(item.preco))}</p>
                        ))}
                    </div>
                    <hr />
                    <div className="summary-total">
                        <strong>Total: {FormatoMoney(total)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}