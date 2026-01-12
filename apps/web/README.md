# @repo/web - Frontend Client

Interface do usuário desenvolvida com React e Vite, focada em performance e componentização sem dependência excessiva de bibliotecas de UI externas.

## Design e Componentização

Seguindo o requisito de "desenvolver seus próprios componentes", a interface foi construída utilizando **Styled Components**.

### Inspiração e UI Kit
Embora os componentes tenham sido codificados manualmente (Input, Select, Modal, Dropdown, Table), a estrutura de props e o comportamento de acessibilidade foram inspirados em padrões modernos como o **Radix UI**, garantindo uma DX (Developer Experience) consistente e previsível.

**Componentes Customizados:**
- `src/components/ui/Input`: Inputs com suporte a ícones e validação.
- `src/components/ui/Modal`: Gerenciamento de portais e overlays.
- `src/components/ui/Dropdown`: Menus de ação flutuantes.
- `src/components/ui/Select`: Select customizado para manter a identidade visual.

## Tecnologias e Bibliotecas

- **React 19**: Versão mais recente para aproveitar as otimizações do framework.
- **Styled Components**: Para estilização isolada e dinâmica (CSS-in-JS).
- **React Hook Form + Zod**: Gerenciamento de formulários performático e schemas de validação robustos.
- **Context API**: Utilizado em `client-context.tsx` para gerenciar o estado global dos clientes e evitar "prop drilling" excessivo.
- **Lucide React**: Biblioteca de ícones leve.
- **Ofetch**: Client HTTP para comunicação com a API.

## Funcionalidades Implementadas

1. **Gestão de Clientes**:
   - Tabela responsiva listando os dados.
   - Ações rápidas (Editar/Excluir) via Dropdown.

2. **Formulário Inteligente**:
   - Validação em tempo real.
   - **Busca de CEP**: Ao digitar um CEP válido, o endereço é preenchido automaticamente (integração com API externa).

## Executando o Frontend

Normalmente executado via comando root `pnpm dev`, mas pode ser iniciado isoladamente:

```bash
cd apps/web
pnpm dev
```
