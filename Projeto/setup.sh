#!/bin/bash
# 🚀 Script de Setup Rápido - Series Journal

echo "🎬 Configurando Series Journal..."

# Criar projeto React
echo "📦 Criando projeto React..."
npx create-react-app series-journal
cd series-journal

# Instalar dependências
echo "⚙️ Instalando dependências..."
npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns

# Criar estrutura de pastas
echo "📁 Criando estrutura de pastas..."
mkdir -p src/components/NavBar
mkdir -p src/components/SerieForm  
mkdir -p src/components/SerieList
mkdir -p src/pages
mkdir -p src/services

# Mensagem final
echo "✅ Setup concluído!"
echo "📋 Próximos passos:"
echo "   1. Copie todos os arquivos do projeto para as pastas corretas"
echo "   2. Execute a API: npm start (na pasta da API)"
echo "   3. Execute o projeto: npm start (na pasta do projeto)"
echo "   4. Acesse http://localhost:3000"
echo ""
echo "🎉 Bom desenvolvimento!"
