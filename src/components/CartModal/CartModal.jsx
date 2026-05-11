import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartModal.css";


export default function CartModal({ isOpen, onClose, cartItems, onRemove }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleFinalizar = () => {
    onClose(); // Fecha o modal
    navigate("/Checkout"); // Vai para a página de pagamento
  };
  const total = cartItems.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p className="empty-msg">O carrinho está vazio.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imagem} alt={item.nome} />
                <div className="item-info">
                  <p>{item.nome}</p>
                  <strong>R$ {item.preco.toFixed(2)}</strong>
                </div>
                <button className="remove-btn" onClick={() => onRemove(index)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total-container">
            <span>Total:</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
          <button
            className="finish-btn"
            disabled={cartItems.length === 0}
            onClick={handleFinalizar} // Chama a função aqui
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}