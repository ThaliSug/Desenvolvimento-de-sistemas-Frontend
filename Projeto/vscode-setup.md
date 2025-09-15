# 🖥️ Configuração e Dicas para VSCode

## 📦 Extensões Recomendadas

Para uma melhor experiência de desenvolvimento, instale essas extensões no VSCode:

### Essenciais para React:
- **ES7+ React/Redux/React-Native snippets** - Snippets para React
- **Auto Rename Tag** - Renomeia tags automaticamente  
- **Bracket Pair Colorizer 2** - Colore parênteses/chaves
- **Prettier - Code formatter** - Formatação automática
- **ESLint** - Linting para JavaScript/React
- **GitLens** - Melhor integração com Git

### Para Produtividade:
- **Material Icon Theme** - Icons bonitos nos arquivos
- **Auto Import - ES6, TS, JSX, TSX** - Imports automáticos
- **Path Intellisense** - Autocomplete para caminhos
- **CSS Peek** - Visualizar CSS ao passar mouse
- **Color Highlight** - Destaca cores no código

## ⚙️ Configuração do VSCode

Crie um arquivo `.vscode/settings.json` na raiz do projeto:

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.jsx": "javascriptreact"
  }
}
```

## 🎨 Snippet Personalizados

Adicione snippets úteis em File > Preferences > User Snippets > javascriptreact.json:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import './${1:ComponentName}.css';",
      "",
      "const ${1:ComponentName} = () => {",
      "  return (",
      "    <div className='${1/(.*)/${1:/downcase}/}-container'>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ]
  },
  "React useState": {
    "prefix": "us",
    "body": ["const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);"]
  },
  "React useEffect": {
    "prefix": "ue",
    "body": [
      "useEffect(() => {",
      "  $1",
      "}, [$2]);"
    ]
  }
}
```

## 🏗️ Estrutura de Pastas no VSCode

Organize assim para melhor visualização:

```
series-journal/
├── 📁 public/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 NavBar/
│   │   ├── 📁 SerieForm/
│   │   └── 📁 SerieList/
│   ├── 📁 pages/
│   ├── 📁 services/
│   ├── 📄 App.jsx
│   └── 📄 index.js
└── 📄 package.json
```

## 🔍 Debugging no VSCode

Configure debugging para React criando `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "\${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "\${webRoot}/*"
      }
    }
  ]
}
```

## 📋 Tasks Úteis

Crie `.vscode/tasks.json` para atalhos:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start React",
      "type": "shell",
      "command": "npm start",
      "group": "build",
      "isBackground": true
    },
    {
      "label": "Install Dependencies",
      "type": "shell", 
      "command": "npm install",
      "group": "build"
    }
  ]
}
```

## 🎯 Atalhos Úteis do VSCode

- **Ctrl+Shift+P** - Command Palette
- **Ctrl+P** - Quick Open (buscar arquivos)
- **Ctrl+D** - Selecionar palavra (múltiplo)
- **Alt+Shift+Down** - Duplicar linha
- **Ctrl+/** - Comentar/descomentar
- **Ctrl+K+C** - Comentar bloco
- **F2** - Renomear símbolo
- **Ctrl+Click** - Ir para definição

## 🐛 Dicas de Debugging

1. **Console.log com estilo:**
```javascript
console.log('%c Dados da série:', 'background: #e50914; color: white; padding: 2px 5px; border-radius: 3px', serie);
```

2. **React Developer Tools:**
   - Instale a extensão do navegador
   - Inspecione componentes React
   - Veja props e state em tempo real

3. **Debugging de API:**
   - Use Network tab do DevTools
   - Configure breakpoints nos services
   - Console.error para erros

## 📁 Organização de Imports

Mantenha imports organizados:

```javascript
// 1. Imports do React
import React, { useState, useEffect } from 'react';

// 2. Imports de bibliotecas externas  
import { Button, Card } from '@mui/material';
import axios from 'axios';

// 3. Imports de componentes locais
import NavBar from '../components/NavBar/NavBar';

// 4. Imports de services/utils
import { seriesAPI } from '../services/seriesAPI';

// 5. Imports de estilos
import './ComponentName.css';
```

## 🚀 Scripts de Desenvolvimento

Adicione ao package.json:

```json
{
  "scripts": {
    "dev": "npm start",
    "build": "npm run build",
    "analyze": "npm run build && npx serve -s build",
    "clean": "rm -rf build node_modules && npm install"
  }
}
```

## 🎨 Tema Recomendado

Para combinar com o projeto, use temas escuros:
- **Material Theme** - Darker High Contrast
- **One Dark Pro** 
- **Dracula Official**

## 💡 Produtividade Máxima

1. **Emmet para JSX:**
   - `.container>h1.title+.content` expande automaticamente

2. **Multi-cursor:**
   - Selecione várias ocorrências com Ctrl+D
   - Alt+Click para cursores múltiplos

3. **Live Server para arquivos estáticos:**
   - Instale Live Server extension
   - Teste componentes isoladamente
