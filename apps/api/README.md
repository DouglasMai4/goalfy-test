# @repo/api - Backend Service

Serviço REST desenvolvido em Node.js para gerenciar o cadastro de clientes.

## Arquitetura

O projeto segue os princípios de **DDD (Domain-Driven Design)** para garantir desacoplamento e facilidade de manutenção:

- **src/domain**: Contém as entidades e interfaces de repositórios (Regras de negócio agnósticas a framework).
- **src/application**: Casos de uso da aplicação (Use Cases).
- **src/infra**: Implementações concretas (Banco de dados com Drizzle, Servidor Express, Repositórios).
- **src/interfaces**: Camada de apresentação (Controllers, Rotas, Factories).

## Stack Tecnológica

- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Drizzle ORM
- **Database**: LibSQL (SQLite file)
- **Validação**: Zod

## Configuração e Comandos

### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `apps/api` (se necessário), baseando-se nas configurações padrão:
- `PORT`: 3030 (Padrão)
- `DB_FILE_NAME`: file:local.db (Padrão)
- `CORS_ORIGINS`: * (Padrão OBS: Separar hosts por ',')

### Scripts Disponíveis

```bash
# Rodar servidor em modo desenvolvimento
pnpm dev

# Realiza build da aplicação
pnpm build

# Iniciar aplicação compilada
pnpm start

# Sincronizar schema com o banco de dados
pnpm db:push

# Gerar migrações
pnpm db:generate

# Aplicar migrações
pnpm db:migrate

# Rodar seed (popular banco)
pnpm db:seed

# Visualizar banco de dados (Drizzle Studio)
pnpm db:studio
```

## Documentação da API

Base URL: `http://localhost:3030`

### Clientes

| Método | Rota | Descrição |
| :----: | :--: | :-------: |
| POST | `/clients` | Cria um novo cliente. |
| GET | `/clients` | Lista todos os clientes. |
| GET | `/clients/:id` | Busca um cliente por ID. |
| GET | `/clients/email/:email` | Busca um cliente por E-mail. |
| PUT | `/clients/:id` | Atualiza os dados de um cliente. |
| DELETE | `/clients/:id` | Remove um cliente. |

### Exemplo de Payload (POST/PUT):

```json
{
  "name": "Douglas Maia",
  "email": "douglas@example.com",
  "phone": "47999999999",
  "zipCode": "89200000",
  "address": "Rua exemplo",
  "city": "Joinville",
}
```

### Postman

Use o arquivo: [Postman Collection](https://github.com/DouglasMai4/goalfy-test/blob/main/apps/api/postman_collection.json)
