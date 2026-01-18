# mycash+ - Gestão Financeira Familiar

Sistema de gestão financeira familiar desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Recharts** - Gráficos e visualizações
- **Framer Motion** - Animações
- **date-fns** - Manipulação de datas

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

### Desenvolvimento
```bash
npm run dev
```

### Build de produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 📁 Estrutura de Pastas

```
src/
├── components/        # Componentes React
│   ├── layout/       # Componentes de layout (Sidebar, HeaderMobile, etc)
│   ├── dashboard/    # Componentes específicos do dashboard
│   ├── cards/        # Componentes relacionados a cartões
│   ├── transactions/ # Componentes de transações
│   ├── profile/      # Componentes de perfil
│   └── ui/           # Componentes UI reutilizáveis
├── contexts/         # Contexts React (FinanceProvider, etc)
├── hooks/            # Hooks customizados
├── pages/            # Páginas principais (rotas)
├── types/            # Definições TypeScript
├── utils/            # Funções utilitárias
├── constants/        # Constantes do sistema
└── styles/           # Estilos globais
```

## 🎨 Design System

O projeto utiliza variáveis do Figma mapeadas no Tailwind:

- **Semânticas**: `primary`, `secondary`, `surface`, `background`
- **Primitivas**: `neutral`, `brand`, `blue`, `green`, `red`
- **Espaçamento**: tokens de `8px` a `56px`
- **Tipografia**: Inter com escalas definidas

## 📱 Breakpoints

- **Mobile**: < 768px
- **Tablet**: ≥ 768px e < 1280px
- **Desktop**: ≥ 1280px e < 1920px
- **Wide**: ≥ 1920px

## 🛣️ Rotas

- `/` - Dashboard
- `/cards` - Cartões de Crédito
- `/transactions` - Transações
- `/profile` - Perfil

## 📝 Licença

Projeto privado - mycash+
