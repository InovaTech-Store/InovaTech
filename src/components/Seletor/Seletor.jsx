import React, { useState } from 'react';
import './Seletor.css'; 

export default function Selector({ active, setActive }) {
//   const [active, setActive] = useState('usuario');

 return (
    <div className="container-seletor">
      
      {/* Mudamos psicologo/paciente para owner/customer */}
      <div 
        className={`slider ${active === 'owner' ? 'right' : 'left'}`} 
      />
      
      <button 
        type="button"
        className={`button ${active === 'customer' ? 'activeText' : ''}`}
        onClick={() => setActive('customer')}
      >
        Cliente
      </button>

      <button 
        type="button"
        className={`button ${active === 'owner' ? 'activeText' : ''}`}
        onClick={() => setActive('owner')}
      >
        Loja
      </button>
    </div>
  );
}