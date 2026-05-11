import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Coluna 1: Sobre */}
          <div className="footer-section about">
            <h2 className="footer-logo">INOVATECH<span>ELETRÔNICA</span></h2>
            <p>Sua referência em tecnologia e inovação. Qualidade e confiança em cada detalhe da sua experiência digital.</p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>

          {/* Coluna 2: Links */}
          <div className="footer-section links">
            <h3>Navegação</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/Lista">Produtos</a></li>
              <li><a href="/Sobre">Sobre Nós</a></li>
              <li><a href="/Contato">Suporte</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="footer-section contact">
            <h3>Atendimento</h3>
            <p><i className="fas fa-envelope"></i> contato@inovatech.com</p>
            <p><i className="fas fa-phone"></i> (11) 99999-9999</p>
            <p><i className="fas fa-map-marker-alt"></i> São Paulo, SP</p>
          </div>

          {/* Coluna 4: Pagamento */}
          <div className="footer-section payment">
            <h3>Pagamento</h3>
            <div className="payment-methods">
              <i className="fab fa-cc-visa" title="Visa"></i>
              <i className="fab fa-cc-mastercard" title="Mastercard"></i>
              <i className="fas fa-pix" title="Pix"></i>
              <i className="fas fa-barcode" title="Boleto"></i>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} InovaTech Eletrônica - Todos os direitos reservados.</p>
          <p>Desenvolvido por Samuel Valeriano</p>
        </div>
      </div>
    </footer>
  );
}