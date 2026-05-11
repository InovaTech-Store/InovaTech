import React, { useState } from 'react';
import './Seletor.css'; 

export default function Selector({ active, setActive }) {


 return (
    <div className="container-seletor">
      
      
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