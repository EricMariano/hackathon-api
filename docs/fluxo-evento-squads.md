# Fluxo: Superadmin → Organização → Evento → Usuários → Squads

## Visão geral do fluxo

```mermaid
flowchart TB
    subgraph Cadastro["1. Cadastro Superadmin"]
        A[Superadmin faz cadastro]
    end

    subgraph Org["2. Organização (opcional)"]
        B[Superadmin cria organização?]
        B1[Sim → cria 1 ou mais Organizations]
        B2[Não → segue sem org]
        B --> B1
        B --> B2
    end

    subgraph Evento["3. Criação do evento"]
        C[Superadmin cria Evento]
        C1[Vincula a 0 ou 1 organização - opcional]
        C2[Squads ainda não existem]
        C --> C1 --> C2
    end

    subgraph Divulgação["4. Divulgação"]
        D[Superadmin divulga link do evento]
    end

    subgraph Usuários["5. Usuário acessa link e cria conta"]
        E[Usuário acessa o link do evento]
        F[Usuário cria a conta]
        E --> F
    end

    subgraph Feed["6. Feed do evento: entrar ou criar squad"]
        G[No feed: criar squad ou entrar em um existente?]
        H[Cria novo Squad]
        I[Entra em Squad existente]
        J{Se criou: squad público ou com chave?}
        K[Passkey opcional = público]
        L[Passkey preenchida = acesso com chave]
        G --> H
        G --> I
        H --> J
        J --> K
        J --> L
    end

    A --> B
    B1 --> C
    B2 --> C
    C2 --> D
    D --> E
    F --> G
```



## Relações no modelo de dados

```mermaid
erDiagram
    Superadmin ||--o{ Organization : "cria (opcional)"
    Superadmin ||--o{ Event : "cria"
    Organization ||--o{ Event : "evento pode ser vinculado (opcional)"
    Event ||--o{ Squad : "1 evento, N squads (criados depois)"
    User ||--o{ Squad : "cria squad"
    User }o--|| Squad : "membro de 1 squad"
    Squad }o--|| Event : "pertence a 1 evento"

    Event {
        string id
        string organizationId "opcional"
        string superadminId
    }

    Squad {
        string id
        string eventId
        string passkey "opcional = público"
    }
```



## Resumo por etapa


| Etapa | Quem              | O quê                                                            | Opcional?                                                 |
| ----- | ----------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| 1     | Superadmin        | Cadastro                                                         | —                                                         |
| 2     | Superadmin        | Criar 0, 1 ou mais Organizations                                 | Sim                                                       |
| 3     | Superadmin        | Criar Evento; vincular a **0 ou 1** organização                  | Vínculo com org é opcional; squads não existem na criação |
| 4     | Superadmin        | Divulgar link do evento                                          | —                                                         |
| 5     | Usuário           | Acessar link → **criar conta**                                   | —                                                         |
| 6     | Usuário           | No **feed do evento**: criar squad **ou** entrar em um existente | —                                                         |
| 7     | Usuário (criador) | Se criou: definir passkey ou deixar público                      | Passkey opcional = squad público                          |


## Regras de negócio

- **Um evento = uma organização** (ou nenhuma). Não há múltiplas orgs por evento.
- Usuário **só participa do evento** ao entrar ou criar um squad no feed; não há “participante sem squad”.

## Schema atual

- **Event.organizationId** é `String?` (opcional): evento pode existir sem organização; no máximo uma.
- **Squads** são sempre criados no feed do evento, por usuários; na criação do evento não há squads.
- **Squad.passkey** é `String?`: `null` = público; preenchido = acesso com chave.

