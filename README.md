<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>CQRS Pattern Implementation</strong><br>
  Aplicação desenvolvida em <a href="http://nodejs.org" target="_blank">Node.js</a> com <a href="https://nestjs.com" target="_blank">NestJS</a>, utilizando o padrão arquitetural <b>CQRS</b> para separar claramente operações de leitura (queries) e escrita (commands), garantindo maior escalabilidade, organização e manutenção do código.
</p>

---

## 📚 Objetivo do Projeto

Este projeto foi desenvolvido como **estudo prático** do padrão arquitetural **CQRS (Command Query Responsibility Segregation)** utilizando **NestJS** e **PostgreSQL**.

### O que foi aprendido:

✅ **Segregação de Responsabilidades** - Separar completamente operações de leitura (Queries) e escrita (Commands)
✅ **Event-Driven Architecture** - Publicação de eventos após execução de comandos
✅ **CQRS Pattern** - Implementar CommandBus, QueryBus e Handlers especializados
✅ **Event Sourcing Concepts** - Manutenção de entidades separadas para leitura e escrita
✅ **TypeORM com NestJS** - Integração com PostgreSQL para persistência de dados
✅ **Testes e Validação** - DTOs e validação de dados de entrada

---

## 🏗️ Arquitetura

### Fluxo de Dados - CQRS Pattern

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HTTP Request                                 │
└──────────┬──────────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────┐
│  ProductsController      │
│  ├─ @Post('/create')    │
│  └─ @Get('/get')        │
└──────────┬───────────────┘
           │
           ├──────────────────────┬──────────────────────┐
           │                      │                      │
      CREATE (WRITE)         GET (READ)                 │
           │                      │                      │
           ▼                      ▼                      │
    ┌──────────────┐        ┌──────────────┐            │
    │ CommandBus   │        │  QueryBus    │            │
    └──────┬───────┘        └──────┬───────┘            │
           │                       │                    │
           ▼                       ▼                    │
    ┌──────────────────────┐ ┌──────────────────────┐  │
    │ CreateProductHandler │ │GetProductsHandler    │  │
    │                      │ │                      │  │
    │ • Valida dados       │ │ • Busca dados        │  │
    │ • Persiste no banco  │ │ • Retorna para tela  │  │
    │ • Publica evento     │ │                      │  │
    └──────┬───────────────┘ └──────┬───────────────┘  │
           │                        │                  │
           ▼                        │                  │
    ┌──────────────────────┐        │                  │
    │  ProductEvent        │        │                  │
    │  (Event Handler)     │        │                  │
    │                      │        │                  │
    │ • Atualiza o modelo  │        │                  │
    │   de leitura         │        │                  │
    └──────┬───────────────┘        │                  │
           │                        │                  │
           ▼                        ▼                  │
    ┌─────────────────────────────────────────┐        │
    │       Database (PostgreSQL)              │        │
    │ ├─ ProductWritingEntity (WRITE MODEL)   │        │
    │ └─ ProductReadingEntity (READ MODEL)    │        │
    └─────────────────────────────────────────┘        │
           │                        │                  │
           └────────────────┬───────┘                  │
                            │                         │
                            ▼                         │
                    ┌─────────────────┐               │
                    │   Response      │◄──────────────┘
                    │   para Cliente  │
                    └─────────────────┘
```

### Estrutura de Pastas

```
src/
├── products/
│   ├── comands/              # Operações de ESCRITA
│   │   ├── impl/
│   │   │   └── create-product.command.ts
│   │   └── handlers/
│   │       └── create-product.handler.ts
│   │
│   ├── queries/              # Operações de LEITURA
│   │   ├── impl/
│   │   │   └── get-products.query.ts
│   │   ├── handlers/
│   │   │   └── get-products.handler.ts
│   │   └── dto/
│   │       └── create-products.dto.ts
│   │
│   ├── events/               # Eventos disparados
│   │   ├── impl/
│   │   │   └── product.event.ts
│   │   └── handlers/
│   │       └── product.handler.ts
│   │
│   ├── entities/             # Modelos de dados
│   │   ├── product-writing.entity.ts
│   │   └── product-reading.entity.ts
│   │
│   ├── products.module.ts
│   └── products.controller.ts
│
├── app.module.ts
└── main.ts
```

### Componentes Principais

| Componente | Responsabilidade |
|---|---|
| **Controller** | Recebe requisições HTTP e encaminha para CommandBus ou QueryBus |
| **CommandBus** | Orquestra a execução de comandos (escrita) |
| **QueryBus** | Orquestra a execução de queries (leitura) |
| **Command Handler** | Executa a lógica de escrita e persiste dados |
| **Query Handler** | Executa a lógica de leitura otimizada |
| **Event** | Notificação de que algo ocorreu (ex: produto criado) |
| **Event Handler** | Reage aos eventos (ex: atualizar modelo de leitura) |
| **Writing Entity** | Modelo otimizado para ESCRITA |
| **Reading Entity** | Modelo otimizado para LEITURA |

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **PostgreSQL** >= 12

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/CQRS.git
cd CQRS
```

### Passo 2: Instalar dependências

```bash
yarn install
```

ou

```bash
npm install
```

### Passo 3: Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DATABASE=cqrs_db
```

### Passo 4: Criar banco de dados

```bash
# No PostgreSQL
createdb cqrs_db
```

ou use um cliente como pgAdmin.

### Passo 5: Rodar a aplicação

**Modo desenvolvimento (com auto-reload):**

```bash
yarn start:dev
```

**Modo produção:**

```bash
yarn build
yarn start:prod
```

**Modo debug:**

```bash
yarn start:debug
```

---

## 📋 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `yarn start` | Inicia a aplicação |
| `yarn start:dev` | Inicia em modo desenvolvimento com hot-reload |
| `yarn start:debug` | Inicia em modo debug |
| `yarn start:prod` | Inicia em modo produção |
| `yarn build` | Compila TypeScript para JavaScript |
| `yarn test` | Executa testes unitários |
| `yarn test:watch` | Executa testes em modo watch |
| `yarn test:cov` | Executa testes com cobertura |
| `yarn test:e2e` | Executa testes end-to-end |
| `yarn lint` | Executa linter e corrige problemas |
| `yarn format` | Formata o código com Prettier |

---

## 🔌 Endpoints da API

### Criar Produto (WRITE)

```bash
POST /products/create
Content-Type: application/json

{
  "name": "Notebook",
  "price": 3500.00,
  "active": true
}
```

**Resposta:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Notebook",
  "price": 3500.00,
  "active": true,
  "createdAt": "2026-03-14T10:30:00Z"
}
```

### Listar Produtos (READ)

```bash
GET /products/get
```

**Resposta:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Notebook",
    "price": 3500.00,
    "active": true,
    "createdAt": "2026-03-14T10:30:00Z"
  }
]
```

---

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes com coverage
yarn test:cov

# Testes end-to-end
yarn test:e2e
```

---

## 📦 Tecnologias Utilizadas

- **NestJS** - Framework Node.js progressivo e opinado
- **TypeScript** - Linguagem com tipos estáticos
- **TypeORM** - ORM para Node.js com suporte a TypeScript
- **PostgreSQL** - Banco de dados relacional
- **@nestjs/cqrs** - Módulo CQRS do NestJS
- **Jest** - Framework de testes
- **ESLint** - Linter para código TypeScript
- **Prettier** - Formatador de código

---

## 💡 Conceitos Principais do CQRS

### O que é CQRS?

CQRS = **Command Query Responsibility Segregation**

É um padrão arquitetural que separa **claramente**:

- **Commands**: Operações que **modificam** o estado (CREATE, UPDATE, DELETE)
- **Queries**: Operações que **leem** o estado (READ)

### Benefícios

✅ **Escalabilidade** - Modelos de leitura e escrita podem ser escalados independentemente
✅ **Performance** - Queries podem ser otimizadas para leitura sem comprometer escrita
✅ **Testabilidade** - Lógica de leitura e escrita são isoladas
✅ **Manutenibilidade** - Código mais organizado e responsabilidades claras
✅ **Event Sourcing** - Facilita a implementação de event sourcing

---

## 🤝 Contribuindo

Sinta-se livre para fazer fork e enviar pull requests!

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 📞 Suporte

Para dúvidas ou sugestões sobre este projeto, abra uma issue no repositório.

---

**Happy Coding! 🚀**
