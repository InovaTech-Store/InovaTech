import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: "/nome-do-seu-repositorio/", // COLOQUE O NOME DO REPOSITÓRIO DO GITHUB AQUI
})