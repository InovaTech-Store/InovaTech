import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Substitua 'nome-do-seu-repositorio' pelo nome real do seu projeto no GitHub
    base: command === 'build' ? '/nome-do-seu-repositorio/' : '/',
  }
})