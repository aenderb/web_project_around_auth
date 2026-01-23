# Tripleten web_project_around_auth

## Sobre o Projeto

Aplicação web desenvolvida em React que simula uma rede social de compartilhamento de fotos, com sistema completo de autenticação de usuários. O projeto possui áreas restritas (logada) e públicas (não logada), implementando rotas protegidas e gerenciamento de tokens JWT.

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e design responsivo
- **JavaScript (ES6+)** - Lógica e interatividade
- **React** - Biblioteca para construção da interface
- **React Router DOM** - Gerenciamento de rotas client-side
- **Vite** - Ferramenta de build e desenvolvimento

## Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Registro de novos usuários** com validação de formulário
- **Login** com email e senha
- **Persistência de sessão** usando localStorage
- **Token JWT** para autenticação nas requisições
- **Proteção de rotas** para áreas restritas
- **Logout** com limpeza de dados

### 📍 Rotas da Aplicação
- `/` - Página principal (protegida) - exibe perfil e galeria de fotos
- `/signin` - Página de login (pública)
- `/signup` - Página de registro (pública)
- `/*` - Redirecionamento automático baseado no estado de autenticação

### 👤 Área Logada (Protegida)
- Visualização e edição de perfil do usuário
- Alteração de foto do avatar
- Galeria de fotos com cards dinâmicos
- Sistema de likes em fotos
- Adicionar novas fotos com título e URL
- Excluir fotos próprias
- Popups modais para todas as interações

### 🌐 Área Não Logada (Pública)
- Formulário de registro com validação
- Formulário de login com validação
- Feedback visual com InfoTooltip (sucesso/erro)
- Links de navegação entre login e registro

## Validações Implementadas

### Validação de Formulários
- **Email**: formato válido e campo obrigatório
- **Senha**: mínimo 6 caracteres, campo obrigatório
- **Nome**: 2-40 caracteres
- **Descrição (About)**: 2-200 caracteres
- **URL de imagem**: formato válido de URL
- **Validação em tempo real**: feedback imediato após blur
- **Botões desabilitados**: quando há erros ou campos vazios

### Validação de Avatar e Cards
- Verificação de formato de URL
- Validação de título dos cards

## Design e Responsividade

### Metodologia BEM
- Organização de CSS seguindo Block-Element-Modifier
- Arquivos CSS separados por componentes
- Classes reutilizáveis e semânticas

### Breakpoints Responsivos
- **Desktop**: > 880px
- **Tablet**: 880px
- **Mobile**: 320px

### Componentes de UI
- **Header**: navbar com menu hambúrguer no mobile
- **Loader**: animação de carregamento com pontos piscantes
- **InfoTooltip**: modal de feedback com ícones de sucesso/erro
- **Popups**: modais para edição e adição de conteúdo
- **Cards**: componentes de foto com like e delete

## Conhecimentos Aplicados

### JavaScript/React
- **Hooks**: useState, useEffect, useCallback
- **Context API**: gerenciamento de estado global do usuário
- **Custom Hooks**: validação de formulários
- **Fetch API**: comunicação com backend
- **Async/Await**: operações assíncronas
- **Error Handling**: tratamento de erros nas requisições

### POO e Arquitetura
- **Programação Orientada a Objetos**: classes para API
- **Separação de responsabilidades**: componentes, utils, contexts
- **Componentização**: componentes funcionais reutilizáveis
- **Single Responsibility**: cada componente com função específica

### Gerenciamento de Estado
- **Estado local**: useState para inputs e UI
- **Estado global**: Context API para usuário atual
- **Estado de autenticação**: isLoggedIn e isCheckingToken
- **Estado de loading**: para cada operação assíncrona

### Rotas e Navegação
- **Protected Route**: HOC para proteção de rotas
- **React Router**: navegação client-side sem reload
- **Navegação programática**: useNavigate hook
- **Verificação de token**: ao carregar a aplicação

## Estrutura do Projeto

```
src/
├── blocks/              # Arquivos CSS por componente
│   ├── auth.css
│   ├── header.css
│   ├── popup.css
│   ├── Loader.css
│   └── ...
├── components/          # Componentes React
│   ├── App.jsx
│   ├── Header/
│   ├── Main/
│   ├── Footer/
│   ├── Login/
│   ├── Register/
│   ├── Loader/
│   ├── InfoTooltip/
│   ├── ProtectedRoute.jsx
│   └── ...
├── contexts/            # Context API
│   └── CurrentUserContext.js
├── utils/               # Funções utilitárias e validações
│   ├── api.js
│   ├── auth.js
│   ├── loginFormValidation.js
│   ├── registerFormValidation.js
│   └── ...
├── images/              # Recursos de imagem
└── main.jsx            # Ponto de entrada
```

## API Endpoints

**Base URL**: `https://se-register-api.en.tripleten-services.com/v1`

- `POST /signup` - Registro de novo usuário
- `POST /signin` - Login de usuário
- `GET /users/me` - Informações do usuário autenticado

**API de Fotos**: `https://around-api.pt-br.tripleten-services.com/v1`

- `GET /users/me` - Dados do usuário
- `GET /cards` - Lista de cards
- `POST /cards` - Criar novo card
- `DELETE /cards/:id` - Deletar card
- `PUT /cards/:id/likes` - Adicionar like
- `DELETE /cards/:id/likes` - Remover like
- `PATCH /users/me` - Atualizar perfil
- `PATCH /users/me/avatar` - Atualizar avatar

## Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para armazenar URLs da API e tokens de autenticação. Siga os passos abaixo:

1. **Copie o arquivo de exemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Preencha as variáveis no arquivo `.env`**:
   ```env
   VITE_API_AUTH_URL=https://se-register-api.en.tripleten-services.com/v1
   VITE_API_BASE_URL=https://around-api.pt-br.tripleten-services.com/v1
   VITE_API_TOKEN=seu-token-aqui
   ```

3. **Importante**: 
   - O arquivo `.env` **não deve** ser commitado no git (já está no `.gitignore`)
   - O arquivo `.env.example` serve como template para a equipe
   - Variáveis no Vite devem começar com `VITE_` para serem expostas ao cliente

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## Melhorias Implementadas

- ✅ Sistema completo de autenticação
- ✅ Rotas protegidas e públicas
- ✅ Validação de formulários em tempo real
- ✅ Feedback visual com InfoTooltip
- ✅ Loader animado durante verificação de token
- ✅ Menu hambúrguer responsivo no header
- ✅ Persistência de sessão
- ✅ Tratamento de erros
- ✅ Estados de loading para todas operações
- ✅ Design responsivo completo

## Autor

Projeto desenvolvido por Aender Binoto como parte do curso da Tripleten

---

**Última atualização**: Janeiro 2026