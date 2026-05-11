import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Hearder/Header';
import CartModal from '../CartModal/CartModal';

export default function AppLayout() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (produto) => {
    setCartItems([...cartItems, produto]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]); // Função para limpar após a compra

  return (
    <>
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      {/* O SEGREDO ESTÁ AQUI: Passar tudo no 'context' */}
      <main>
        <Outlet context={{ cartItems, addToCart, clearCart }} />
      </main>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onRemove={removeFromCart} 
      />
    </>
  );
}