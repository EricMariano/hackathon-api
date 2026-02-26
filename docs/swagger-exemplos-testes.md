# Exemplos para testes no Swagger

Use os JSON abaixo no Swagger UI (`/api`) para testar todos os endpoints da API.

---

## Base URL

- **Local:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:3000/api`

---

## Índice por módulo

| Módulo        | Endpoints |
|---------------|-----------|
| [App (root)](#app-root) | GET / |
| [Events](#events) | POST, GET, GET shareable-link/:id, GET :id, PUT :id, DELETE :id |
| [Superadmin](#superadmin) | POST, GET, GET :id, PATCH :id, DELETE :id |
| [Organization](#organization) | POST, GET, GET :id, PATCH :id, DELETE :id |
| [Users](#users) | POST, GET, GET :id, PATCH :id, DELETE :id |

---

## App (root)

### GET / — Health / Hello

Sem body. Método **GET**.

**Resposta esperada (200):** string (ex.: `"Hello World!"`).

---

## Events

### 1. POST /events — Criar evento

**Body (application/json):**

```json
{
  "name": "Hackathon 2025",
  "description": "Maratona de programação com foco em inovação e tech",
  "startDate": "2025-03-01T09:00:00.000Z",
  "endDate": "2025-03-02T18:00:00.000Z",
  "location": "São Paulo",
  "categoryBadges": ["tech", "inovação", "hackathon"],
  "eventLink": "",
  "organizationId": "uuid-da-organizacao-ou-vazio",
  "superadminId": "uuid-do-superadmin",
  "squads": []
}
```

**Resposta esperada (201):** objeto do evento criado (com `id`, `eventLink` preenchido, etc.).

---

### 2. GET /events — Listar todos os eventos

Sem body. **Resposta (200):** array de eventos.

---

### 3. GET /events/shareable-link/:id — Link compartilhável

**Path:** `id` = UUID do evento.

**Resposta (200):**

```json
{
  "link": "http://localhost:3000/events/{id}"
}
```

---

### 4. GET /events/:id — Buscar evento por ID

**Path:** `id` = UUID do evento. **Resposta (200):** evento com `organization`, `superadmin`, `squads`.

---

### 5. PUT /events/:id — Atualizar evento

**Path:** `id` = UUID do evento.

**Body (todos opcionais):**

```json
{
  "name": "Hackathon 2025 - Atualizado",
  "description": "Nova descrição",
  "startDate": "2025-03-05T09:00:00.000Z",
  "endDate": "2025-03-06T18:00:00.000Z",
  "location": "Rio de Janeiro",
  "categoryBadges": ["tech", "inovação", "dev"],
  "eventLink": "http://localhost:3000/events/uuid",
  "organizationId": "uuid-org",
  "superadminId": "uuid-superadmin",
  "squads": []
}
```

**Atualização parcial:**

```json
{
  "name": "Hackathon 2025 - Edição Especial",
  "location": "São Paulo - Centro de Convenções"
}
```

**Resposta (200):** evento atualizado.

---

### 6. DELETE /events/:id — Remover evento

**Path:** `id` = UUID do evento. Sem body. **Resposta (200):** objeto do evento removido.

---

## Superadmin

### 1. POST /superadmin — Criar superadmin

**Body (application/json):**

```json
{
  "firstName": "Maria",
  "lastName": "Silva",
  "phone": "+5511999999999",
  "email": "maria.silva@email.com",
  "password": "senhaSegura123"
}
```

**Regras:** `password` entre 8 e 32 caracteres; `phone` no formato E.164 (ex.: +5511999999999).

**Resposta esperada (201):** objeto do superadmin criado (com `id`, `createdAt`, `updatedAt`).

---

### 2. GET /superadmin — Listar todos os superadmins

Sem body. **Resposta (200):** array de superadmins.

---

### 3. GET /superadmin/:id — Buscar superadmin por ID

**Path:** `id` = UUID do superadmin. **Resposta (200):** objeto do superadmin.

---

### 4. PATCH /superadmin/:id — Atualizar superadmin

**Path:** `id` = UUID do superadmin.

**Body (todos opcionais):**

```json
{
  "firstName": "Maria",
  "lastName": "Silva Santos",
  "phone": "+5511988888888",
  "email": "maria.santos@email.com"
}
```

**Atualização parcial:**

```json
{
  "lastName": "Silva Santos",
  "email": "maria.santos@email.com"
}
```

**Resposta (200):** superadmin atualizado. (Não inclui alteração de senha neste DTO.)

---

### 5. DELETE /superadmin/:id — Remover superadmin

**Path:** `id` = UUID do superadmin. Sem body. **Resposta (200):** objeto do superadmin removido.

---

## Organization

> **Nota:** Se o módulo de organizações não estiver importado em `AppModule`, adicione `OrganizationsModule` nos `imports` para esses endpoints funcionarem.

### 1. POST /organization — Criar organização

**Body (application/json):**

```json
{
  "name": "Tech Corp",
  "description": "Empresa de tecnologia e inovação",
  "email": "contato@techcorp.com",
  "website": "https://techcorp.com",
  "superadminId": "uuid-do-superadmin"
}
```

**Campos:** `name`, `description`, `email` e `superadminId` (UUID) obrigatórios; `website` opcional.

**Resposta esperada (201):** objeto da organização criada (com `id`, `createdAt`, etc.).

---

### 2. GET /organization — Listar todas as organizações

Sem body. **Resposta (200):** array de organizações.

---

### 3. GET /organization/:id — Buscar organização por ID

**Path:** `id` = UUID da organização. **Resposta (200):** objeto da organização.

---

### 4. PATCH /organization/:id — Atualizar organização

**Path:** `id` = UUID da organização.

**Body (todos opcionais):**

```json
{
  "name": "Tech Corp Brasil",
  "description": "Empresa de tecnologia e inovação no Brasil",
  "email": "contato@techcorp.com.br",
  "website": "https://techcorp.com.br"
}
```

**Atualização parcial:**

```json
{
  "name": "Tech Corp Brasil",
  "website": "https://novosite.com"
}
```

**Resposta (200):** organização atualizada.

---

### 5. DELETE /organization/:id — Remover organização

**Path:** `id` = UUID da organização. Sem body. **Resposta (200):** objeto da organização removida.

---

## Users

### 1. POST /users — Criar usuário

**Body (application/json):**

```json
{
  "firstName": "João",
  "lastName": "Oliveira",
  "phone": "+5511977777777",
  "email": "joao.oliveira@email.com",
  "password": "senhaSegura123"
}
```

**Regras:** `password` entre 8 e 32 caracteres; `phone` no formato aceito pelo validador (ex.: E.164).

**Resposta esperada (201):** objeto do usuário criado (com `id`, `createdAt`, `updatedAt`).

---

### 2. GET /users — Listar todos os usuários

Sem body. **Resposta (200):** array de usuários.

---

### 3. GET /users/:id — Buscar usuário por ID

**Path:** `id` = UUID do usuário. **Resposta (200):** objeto do usuário.

---

### 4. PATCH /users/:id — Atualizar usuário

**Path:** `id` = UUID do usuário.

**Body (todos opcionais):**

```json
{
  "firstName": "João",
  "lastName": "Oliveira Santos",
  "phone": "+5511966666666",
  "email": "joao.santos@email.com"
}
```

**Atualização parcial:**

```json
{
  "lastName": "Oliveira Santos",
  "email": "joao.santos@email.com"
}
```

**Resposta (200):** usuário atualizado. (Não inclui alteração de senha neste DTO.)

---

### 5. DELETE /users/:id — Remover usuário

**Path:** `id` = UUID do usuário. Sem body. **Resposta (200):** objeto do usuário removido.

---

## Ordem sugerida para testar (fluxo completo)

1. **GET /** — Verificar se a API está no ar.
2. **POST /superadmin** — Criar um superadmin; guardar o `id`.
3. **POST /organization** — Criar uma organização com o `superadminId` do passo 2; guardar o `id` da organização.
4. **POST /events** — Criar um evento com o `superadminId` e o `organizationId` (ou só `superadminId`); guardar o `id` do evento.
5. **GET /events**, **GET /events/:id**, **GET /events/shareable-link/:id** — Listar, buscar e obter link.
6. **PUT /events/:id** — Atualizar o evento.
7. **POST /users** — Criar um usuário; guardar o `id`.
8. **GET /users**, **GET /users/:id** — Listar e buscar usuário.
9. **PATCH /superadmin/:id**, **PATCH /organization/:id**, **PATCH /users/:id** — Testar atualizações parciais.
10. **DELETE** — Remover em ordem que respeite FKs (ex.: evento → organização → superadmin; usuário quando aplicável).

---

## IDs e validações

| Recurso      | Campo principal   | Observação |
|-------------|-------------------|------------|
| Evento      | `superadminId`    | UUID de um Superadmin existente. |
| Evento      | `organizationId`  | UUID de Organization ou valor aceito pelo backend (pode ser opcional). |
| Organização | `superadminId`    | UUID de um Superadmin existente. |
| Telefone    | `phone`           | Formato E.164 (ex.: +5511999999999). |
| Senha       | `password`        | 8 a 32 caracteres (create). |

Se o banco estiver vazio, crie primeiro um **Superadmin** (POST /superadmin) e use o `id` retornado nos demais recursos que exigirem `superadminId`.
