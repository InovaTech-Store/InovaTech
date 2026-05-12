import React from "react";
import { useNavigate } from "react-router-dom";
import FormatoMoney from "../FormatoMoney/FormatoMoney";
import "./CartModal.css";


export default function CartModal({ isOpen, onClose, cartItems, onRemove }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleFinalizar = () => {
    onClose();
    navigate("/Checkout"); 
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
                  <strong>{FormatoMoney(Number(item.preco))}</strong>
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
            <strong>{FormatoMoney(total)}</strong>
          </div>
          <button
            className="finish-btn"
            disabled={cartItems.length === 0}
            onClick={handleFinalizar} 
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}