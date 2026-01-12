# Goalfy Full Stack Test

Solução desenvolvida para o teste técnico de desenvolvedor Full Stack da Goalfy. O projeto consiste em uma aplicação de gerenciamento de clientes, estruturada como um monorepo utilizando **pnpm workspaces**.

## Sobre o Projeto

O objetivo foi criar uma aplicação completa (CRUD) seguindo os princípios de **DDD (Domain-Driven Design)** no backend e componentização avançada no frontend.

### Estrutura do Monorepo
- **apps/api**: Backend em Node.js com Express e Drizzle ORM.
- **apps/web**: Frontend em React com Styled Components e Vite.

## Tecnologias Principais

- **Gerenciador de Pacotes**: pnpm
- **Linguagem**: TypeScript
- **Backend**: Node.js, Express, Drizzle ORM, SQLite (LibSQL), Zod.
- **Frontend**: React, Styled Components, React Hook Form, Context API.
- **Code Quality**: Biome.

## Requisitos do Teste Atendidos

### Front-end
- [x] Utilização de React com TypeScript e Styled Components.
- [x] Uso de Context API e Hooks.
- [x] Fidelidade ao design proposto (Figma).
- [x] CRUD de Clientes (Listagem e Modal de Cadastro).
- [x] Validação de campos (Obrigatórios, E-mail, CEP).
- [x] Integração com API pública de CEP.
- [x] Componentes próprios (evitando libs de UI prontas).

### Back-end
- [x] Node.js.
- [x] API REST (GET, POST, PUT, DELETE).
- [x] Persistência de dados (SQLite via Drizzle ORM).
- [x] Estrutura baseada em DDD.

## Instalação e Execução

### Pré-requisitos
- Node.js (v20+ recomendado)
- pnpm instalado (`npm install -g pnpm`)

### Passo a passo

1. **Instale as dependências na raiz (o pnpm gerencia o workspace):**
```bash
pnpm install
```

2. **Configuração do Banco de Dados:** Antes de rodar, é necessário gerar o banco SQLite localmente.
```bash
pnpm --filter @repo/api db:push
# Opcional: Popular com dados iniciais
pnpm --filter @repo/api db:seed
```

3. **Executando a aplicação (Front e Back simultaneamente):** Na raiz do projeto, execute:
```bash
pnpm dev
```

- O Backend estará rodando em: `http://localhost:3030`
- O Frontend estará rodando em: `http://localhost:5173`

---

**Desenvolvido por Douglas Veloso Maia**
