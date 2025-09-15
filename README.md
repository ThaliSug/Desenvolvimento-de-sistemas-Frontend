# 📺 Series Journal

Um sistema moderno e completo para gerenciar suas séries assistidas, desenvolvido com React e Material-UI.

## 🎯 Sobre o Projeto

O **Series Journal** é um projeto desenvolvido para a disciplina de Desenvolvimento de Sistemas Frontend que permite aos usuários catalogar e organizar todas as séries que assistiram de forma prática e visual.

### ✨ Características Principais

- 🎨 **Interface Moderna**: Design elegante com tema escuro e efeitos visuais
- 🚀 **Performance Otimizada**: Carregamento rápido e responsividade
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔍 **Busca Avançada**: Encontre séries por título, diretor ou produtora
- 🏷️ **Filtros por Categoria**: Organize por gênero/categoria
- 📊 **Estatísticas Personalizadas**: Veja suas preferências e histórico
- ♿ **Acessibilidade**: Compatível com leitores de tela e navegação por teclado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Material-UI (MUI) v5** - Framework de componentes React
- **React Router Dom** - Roteamento para Single Page Application
- **Axios** - Cliente HTTP para requisições à API
- **Date-fns** - Manipulação de datas
- **CSS3 com Animações** - Estilos avançados e transições

### Recursos Adicionais
- **Material Icons** - Ícones do Material Design
- **Responsive Design** - Layout adaptativo
- **CSS Grid & Flexbox** - Layout moderno
- **Custom Hooks** - Lógica reutilizável

## 🏗️ Estrutura do Projeto

```
series-journal/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── NavBar/
│   │   │   ├── NavBar.jsx
│   │   │   └── NavBar.css
│   │   ├── SerieForm/
│   │   │   ├── SerieForm.jsx
│   │   │   └── SerieForm.css
│   │   └── SerieList/
│   │       ├── SerieList.jsx
│   │       └── SerieList.css
│   ├── pages/
│   │   ├── Home.jsx (+ Home.css)
│   │   ├── About.jsx
│   │   ├── AddSerie.jsx
│   │   └── SeriesList.jsx
│   ├── services/
│   │   └── seriesAPI.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

### 1. Clone o repositório da API

Primeiro, você precisa clonar e executar a API do projeto:

```bash
git clone https://github.com/adsPucrsonline/DesenvolvimentoFrontend.git
cd DesenvolvimentoFrontend/readingJournal-api
npm install
npm start
```

A API estará rodando em `http://localhost:5000`

## Ajuste técnico na API para atualização de séries

Para garantir a compatibilidade com o padrão RESTful e o funcionamento do CRUD completo, foi necessário ajustar o backend da API.

- **Foi corrigida a rota PUT (/series/:id)**, permitindo atualizar uma série pelo seu ID diretamente na URL.
- O código atualizado da rota PUT está no arquivo de rotas da API (`serieJournal-api/routes/series.js`):


**Dessa forma, o frontend consegue se comunicar com a API como esperado, usando o formato padrão:**

- O corpo da requisição JSON pode conter todos os campos da série, e o backend identifica pelo `id` da URL.

> **Observação:** Nenhuma mudança nos dados de seed foi necessária. O ajuste é compatível com a estrutura original do backend da disciplina.



### 2. Configure o projeto React

```bash
# Criar o projeto React
npx create-react-app series-journal
cd series-journal

# Instalar dependências adicionais
npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns

# Copiar todos os arquivos do projeto para a pasta src/
# (NavBar, SerieForm, SerieList, páginas, etc.)
```

### 3. Executar o projeto

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 📋 Funcionalidades Implementadas

### ✅ Componentes Obrigatórios

- **NavBar**: Navegação responsiva com menu mobile
- **SerieForm**: Formulário completo com validação
- **SerieList**: Listagem com busca, filtros e ações CRUD

### ✅ Funcionalidades CRUD

- **Create**: Cadastro de novas séries
- **Read**: Visualização e listagem de séries
- **Update**: Edição de séries existentes
- **Delete**: Exclusão com confirmação

### ✅ Campos da Série

- Título (obrigatório)
- Número de Temporadas (obrigatório)
- Data de Lançamento (obrigatório)
- Diretor (obrigatório)
- Produtora (obrigatória)
- Categoria (obrigatória)
- Data que Assistiu (obrigatória)
- Observações (opcional)

### ✅ Recursos Adicionais

- 🔍 **Busca em tempo real** por título, diretor ou produtora
- 🏷️ **Filtros por categoria** com 20+ gêneros disponíveis
- 📊 **Dashboard com estatísticas** (total de séries, temporadas, categorias)
- 👁️ **Visualização detalhada** em modal
- ✏️ **Edição inline** com modal
- 🗑️ **Exclusão segura** com confirmação
- 📱 **Interface responsiva** para todos os dispositivos
- ⚡ **Estados de loading** e feedback visual
- 🎨 **Animações suaves** e transições
- 🌙 **Tema escuro** otimizado para entretenimento

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Vermelho Netflix (#e50914)
- **Secundária**: Dourado (#ffd700)
- **Background**: Gradientes escuros (#141414 → #1a1a1a) + imagem (source: Canvas)
- **Texto**: Branco com variações de opacidade

### Animações e Efeitos
- Transições suaves em todos os elementos
- Hover effects com transformações 3D
- Loading spinners personalizados
- Gradientes animados
- Cards com efeitos de profundidade

### Responsividade
- Mobile-first design
- Breakpoints otimizados
- Menu hamburger em dispositivos móveis
- Cards adaptáveis
- Formulários responsivos

## 🔗 API Integration

O projeto consome uma API REST com os seguintes endpoints:

- `GET /series` - Lista todas as séries
- `GET /series/:id` - Busca série por ID
- `POST /series` - Cria nova série
- `PUT /series/:id` - Atualiza série
- `DELETE /series/:id` - Remove série

Correção REST: Atualização de Séries
A rota PUT /series/:id foi implementada/corrigida no backend para seguir o padrão RESTful, permitindo atualizar uma série pelo seu id na URL.
A requisição de atualização agora é compatível com padrão REST, tornando o CRUD 100% funcional.

### Validações Implementadas
- Validação em tempo real dos campos
- Tratamento de erros da API
- Feedback visual de sucesso/erro
- Estados de loading durante requisições

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

### Tipos de Teste Planejados
- **Unitários**: Componentes isolados
- **Integração**: Fluxos completos
- **E2E**: Testes de ponta a ponta com Cypress

## 📦 Build para Produção

```bash
npm run build
```

Isso criará uma pasta `build/` com os arquivos otimizados para produção.

## 🎯 Estrutura de Componentes

### NavBar Component
- **Localização**: `src/components/NavBar/`
- **Função**: Navegação principal com menu responsivo
- **Recursos**: Logo animado, highlights da página ativa, drawer mobile

### SerieForm Component
- **Localização**: `src/components/SerieForm/`
- **Função**: Formulário de cadastro/edição
- **Recursos**: Validação em tempo real, DatePickers, feedback visual

### SerieList Component
- **Localização**: `src/components/SerieList/`
- **Função**: Listagem e gerenciamento de séries
- **Recursos**: Busca, filtros, cards animados, modais de ação

## 📄 Páginas

### Home (`/`)
Dashboard principal com estatísticas e séries recentes

### Cadastrar Série (`/add`)
Formulário para adicionar nova série

### Lista de Séries (`/list`)
Visualização completa com todas as funcionalidades

### Sobre (`/about`)
Informações sobre o projeto e tecnologias

## 🎨 Personalização de Background

Para adicionar suas próprias imagens de background:

1. Adicione suas imagens na pasta `src/assets/`
2. Descomente o CSS no arquivo `App.css`:

```css
.app {
  background-image: url('./assets/sua-imagem.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```
➕ Melhorias Sugeridas para Futuros Desenvolvimentos
- Possibilidade de cadastrar múltiplas categorias com MultiSelect e armazenar como array, para análises/estatísticas mais precisas.
- Exibição/aplicação de tema ajustável (dark/light) e filtros avançados nos cards.
- Validações adicionais no backend para maior segurança e consistência dos dados.

## 🤝 Contribuições

Este é um projeto acadêmico, mas sugestões são bem-vindas!

## 📝 Licença

Projeto desenvolvido para fins educacionais na disciplina de Desenvolvimento de Sistemas Frontend.

## 🏆 Desenvolvido por

**Thalita Suguikawa**
- 📧 Email: thalita.suguikawa@edu.pucrs.br
- 🎓 Curso: Análise e Desenvolvimento de Sistemas
- 🏫 Instituição: PUCRS Online

---

**Projeto Series Journal** - Seu catálogo pessoal de séries 📺✨
