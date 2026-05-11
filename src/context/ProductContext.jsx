import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
   
    const [produtos, setProdutos] = useState(() => {
        const produtosSalvos = localStorage.getItem('@AppProdutos:lista');
        if (produtosSalvos) {
            return JSON.parse(produtosSalvos); 
        }
        
        return [
            { id: 1, nome: 'iPhone 15 Pro 256GB', preco: 7299.00, descricao: 'Tela 6.1", Chip A17 Pro, Câmera 48MP', imagem: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500' },
            { id: 2, nome: 'Notebook Gamer Ryzen 7', preco: 4899.00, descricao: '16GB RAM, RTX 3060, SSD 512GB', imagem: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('@AppProdutos:lista', JSON.stringify(produtos));
    }, [produtos]);

    const adicionarProduto = (novoProduto) => {
        const produtoComId = { 
            ...novoProduto, 
            id: Date.now(), 
            imagem: novoProduto.imagem || 'data:image/jpeg;base64,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' 
        };
        setProdutos([...produtos, produtoComId]);
    };
    const editarProduto = (id, produtoAtualizado) => {
    setProdutos(prevProdutos => 
        prevProdutos.map(p => p.id === Number(id) ? { ...produtoAtualizado, id: Number(id) } : p)
    );
};

    return (
        <ProductContext.Provider value={{ produtos, adicionarProduto, editarProduto }}>
            {children}
        </ProductContext.Provider>
    );
}
